import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

export default function NavbarSection() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="py-3"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)", // semi transparan
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // untuk Safari
        zIndex: 1000,
      }}
    >
      <Container fluid className="px-4">
        {/* Logo kiri */}
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
          {/* Nav Links tengah */}
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

          {/* Kontak kanan */}
          <div className="d-flex align-items-center">
            <Button
              href="#kontak"
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
    </Navbar>
  );
}
