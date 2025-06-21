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

  // const [welcomeMessage, setWelcomeMessage] = useState();

  return (
    <div style={{ fontFamily: "Poppins" }}>
      {/* <Navbar
        expand="lg"
        sticky="top"
        className="py-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 1000,
        }}
      >
        <Container fluid className="px-4">
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "white",
              fontSize: "28px",
              letterSpacing: "1px",
            }}
          >
            Rental IQRA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" className="bg-light" />

          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mx-auto my-2 my-lg-0">
              <Nav.Link href="/" className="text-white fw-semibold mx-2">
                Beranda
              </Nav.Link>
              <Nav.Link href="/mobil" className="text-white fw-semibold mx-2">
                Cari Mobil
              </Nav.Link>
              <Nav.Link href="#layanan" className="text-white fw-semibold mx-2">
                Layanan
              </Nav.Link>
              <Nav.Link href="#info" className="text-white fw-semibold mx-2">
                Info
              </Nav.Link>
              <Nav.Link href="#lokasi" className="text-white fw-semibold mx-2">
                Lokasi
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center">
              <Button
                href={`https://wa.me/6281341017966`}
                style={{
                  backgroundColor: "#dc3545",
                  borderColor: "#dc3545",
                  color: "#fff",
                }}
                className="d-flex align-items-center"
              >
                Kontak
                <FaPhone className="m-2" />
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
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

          <SearchSection />
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
