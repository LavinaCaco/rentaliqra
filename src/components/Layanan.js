import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaCartPlus,
  FaMoneyBillWave,
  FaCheckSquare,
  FaClock,
  FaStar,
} from "react-icons/fa";

export default function Layanan() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #1a1a1a, #4f4f4f)",
        color: "white",
        padding: "80px 0",
      }}
      id="layanan"
    >
      <Container>
        <div className="text-center mb-5">
          <h1 className="fw-bold text-uppercase">Mengapa Memilih Rental Iqra?</h1>
          <h5 className="fw-normal">
            Rental Iqra Hadir Untuk Membantu Perjalanan Anda
          </h5>
        </div>

        <Row className="g-4 justify-content-center">
          <Col md={4}>
            <Card className="h-100 text-center border-light bg-transparent text-white p-3">
              <div className="mb-3">
                <FaCartPlus size={40} />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Sewa Mudah</Card.Title>
                <Card.Text>
                  Sewa mobil sekarang makin gampang! Di Rental Iqra, cukup klik,
                  pilih mobil, dan langsung jalan. Sewa mudah, tanpa ribet,
                  tanpa drama!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center border-light bg-transparent text-white p-3">
              <div className="mb-3">
                <FaMoneyBillWave size={40} />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Harga Murah</Card.Title>
                <Card.Text>
                  Mau jalan-jalan tapi takut dompet menipis? Tenang, Rental Iqra
                  punya harga mudah yang ramah di kantong, tapi tetap kasih
                  kenyamanan maksimal.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center border-light bg-transparent text-white p-3">
              <div className="mb-3">
                <FaCheckSquare size={40} />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Kualitas Terjamin</Card.Title>
                <Card.Text>
                  Di Rental Iqra semua mobil sudah rutin service setiap bulan,
                  jadi tidak perlu kawatir tentang kondisi mobil yang disewa.
                  Dipastikan aman.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center border-light bg-transparent text-white p-3">
              <div className="mb-3">
                <FaClock size={40} />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Kemudahan Reservasi</Card.Title>
                <Card.Text>
                  Proses pemesanan mudah melalui situs web kami, ditambah
                  dukungan tim kami untuk membantu pilihan kendaraan Anda.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center border-light bg-transparent text-white p-3">
              <div className="mb-3">
                <FaStar size={40} />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Pengalaman Lokal</Card.Title>
                <Card.Text>
                  Kami tahu Bali dengan sangat baik sehingga dapat memberikan
                  rekomendasi wisata, kuliner, dan budaya autentik.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
