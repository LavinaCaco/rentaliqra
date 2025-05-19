import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Image,
  Card,
  InputGroup,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCar,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCartPlus,
  FaCheckSquare,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import SearchSection from "../components/SearchMobilSection";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";
import WhatsAppFAB from "../components/WhatsAppFAB";

export default function Mobil() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "Poppins" }}>
      {/* Navbar */}
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
                  src="/assets/mobil4.png"
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
                  src="/assets/mobil3.jpg"
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
                  src="/assets/mobil3.jpg"
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
                  src="/assets/mobil3.jpg"
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
                  src="/assets/mobil4.png"
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
                  src="/assets/mobil4.png"
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
                  src="/assets/mobil4.png"
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
                  src="/assets/mobil4.png"
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
                  src="/assets/mobil4.png"
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
