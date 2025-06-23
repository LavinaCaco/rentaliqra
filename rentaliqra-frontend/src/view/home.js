import React, { Suspense, lazy, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";

const NavbarSection = lazy(() => import("../components/NavbarSection"));
const HeroSection = lazy(() => import("../components/HeroSection"));
const Top5MobilSection = React.lazy(() => import("../components/Top5MobilSection"));
const Layanan = lazy(() => import("../components/Layanan"));
const SearchSection = lazy(() => import("../components/SearchMobilSection"));
const MapsSection = lazy(() => import("../components/MapsSection"));
const FooterSection = lazy(() => import("../components/FooterSection"));
const FAQSection = lazy(() => import("../components/FAQSection"));
const WhatsAppFAB = lazy(() => import("../components/WhatsAppFAB"));

export default function Home() {
  const navigate = useNavigate();

  const [filterTipe, setFilterTipe] = useState('');
  const [filterHarga, setFilterHarga] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filterTipe) {
      params.append('tipe', filterTipe);
    }
    if (filterHarga) {
      params.append('harga', filterHarga);
    }

    navigate(`/mobil?${params.toString()}`);
  };

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <NavbarSection />

      <Suspense fallback={<div className="text-center py-5">Memuat konten...</div>}>
        <HeroSection />

        <div
          style={{
            height: "600px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <div className="mx-auto" id="layanan">
              <h1 className="fw-bold text-center">Cari mobil sesuai kebutuhanmu</h1>
              <p className="text-center">
                Temukan mobil yang pas untuk setiap kebutuhanmu harian, mingguan,
                atau perjalanan jauh di IQRA rental. <br />
                Proses mudah, armada siap jalan!
              </p>
            </div>
          </div>

          <SearchSection 
            filterTipe={filterTipe}
            setFilterTipe={setFilterTipe}
            filterHarga={filterHarga}
            setFilterHarga={setFilterHarga}
            handleSearch={handleSearch}
          />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Top5MobilSection />
        </Suspense>
        <Layanan />
        <MapsSection />
        <FAQSection />
        <WhatsAppFAB />
        <FooterSection />
      </Suspense>
    </div>
  );
}