import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

export default function NavbarSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="py-3"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
          {/* Nav Links */}
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
            {user ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="text-dark bg-white border-0"
                >
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: "#dc3545",
                  borderColor: "#dc3545",
                  color: "#fff",
                }}
              >
                Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
