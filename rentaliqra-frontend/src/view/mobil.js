import React, { Suspense, lazy, useState, useEffect } from "react"; // 1. Import hook
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner // Tambahkan Spinner untuk loading
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios

import SearchSection from "../components/SearchMobilSection";
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";
import WhatsAppFAB from "../components/WhatsAppFAB";
const NavbarSection = lazy(() => import("../components/NavbarSection"));

export default function Mobil() {
  const navigate = useNavigate();

  // 2. Tambahkan State untuk data mobil dan status loading
  const [mobils, setMobils] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://127.0.0.1:8000'; // Sesuaikan jika perlu

  // 3. Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchMobils = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/mobil`);
        setMobils(response.data); // Simpan data ke state
      } catch (error) {
        console.error("Gagal mengambil data mobil:", error);
        // Anda bisa menambahkan notifikasi error di sini jika perlu
      } finally {
        setLoading(false); // Hentikan status loading
      }
    };

    fetchMobils();
  }, []); // Array dependensi kosong agar hanya berjalan sekali

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <NavbarSection />

      <div className="py-4 my-4" id="layanan">
        <h1 className="fw-bold text-center">Temukan Mobil Kebutuhanmu.</h1>
        <p className="text-center">
          Temukan mobil yang pas untuk setiap kebutuhanmu harian, mingguan, atau
          perjalanan jauh di IQRA rental. <br />
          Proses mudah, armada siap jalan!
        </p>
      </div>

      <SearchSection />

      <div>
        <Container className="pt-3 py-4 my-4">
          {/* 4. Ganti Card statis dengan proses mapping (looping) dan conditional rendering */}
          <Row className="g-4"> {/* g-4 untuk memberi jarak lebih antar card */}
            {loading ? (
              // Tampilkan spinner saat loading
              <Col className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Col>
            ) : mobils.length > 0 ? (
              // Jika data ada, lakukan mapping
              mobils.map((mobil) => (
                <Col md={4} key={mobil.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      // 5. Menggunakan data dinamis dari API
                      src={`${API_URL}/storage/mobil/${mobil.foto}`}
                      style={{ height: "250px", objectFit: "cover" }}
                      alt={mobil.merek}
                    />
                    <Card.Body>
                      <Card.Title className="fw-bold">
                        Rp.{new Intl.NumberFormat('id-ID').format(mobil.harga)}/24h
                      </Card.Title>
                      <Card.Text>{mobil.merek} - {mobil.seat} Kursi</Card.Text>
                    </Card.Body>
                    <Card.Footer className="border-0 bg-white">
                      <Button variant="dark" className="w-100" onClick={() => navigate("/sewa")}>
                        Sewa
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              // Tampilkan pesan jika tidak ada data
              <Col className="text-center">
                <p>Saat ini belum ada mobil yang tersedia.</p>
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <MapsSection />
      <WhatsAppFAB />
      <FooterSection />
    </div>
  );
}