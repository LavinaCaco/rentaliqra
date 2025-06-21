import React, { Suspense, lazy } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhone,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import SearchSection from "../components/SearchMobilSection";
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";
import WhatsAppFAB from "../components/WhatsAppFAB";
const NavbarSection = lazy(() => import("../components/NavbarSection"));

export default function Mobil() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "Poppins" }}>

      {/* <Navbar
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

        <div className="py-4 my-4" id="layanan">
          <h1 className="fw-bold text-center">Temukan Mobil Kebutuhanmu. </h1>
          <p className="text-center">
            Temukan mobil yang pas untuk setiap kebutuhanmu harian, mingguan, atau
            perjalanan jauh di IQRA rental. <br />
            Proses mudah, armada siap jalan!
          </p>
        </div>

      {/* Search */}
      <SearchSection />

      <div>
        <Container className="pt-3 py-4 my-4">
          <Row className="g-3">
            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil4.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil3.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil3.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="pt-3 py-4 my-4">
          <Row className="g-3">
            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil3.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil4.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil4.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="pt-3 py-4 my-4">
          <Row className="g-3">
            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil4.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil4.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src="/assets/mobil4.webp"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Rp.250.000/24h</Card.Title>
                  <Card.Text>Toyota Xenia 2013</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="dark" onClick={() => navigate("/sewa")}>
                    Sewa
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Maps */}
      <MapsSection />

      {/* FAB */}
      <WhatsAppFAB />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
