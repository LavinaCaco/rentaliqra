import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Table, Carousel, Card, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaPhone} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";




export default function Sewa() {
const navigate = useNavigate();
  return (
    
    <Container fluid className="px-0" style={{ backgroundColor: '#e0e0e0', fontFamily: "Poppins"  }} >

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
                  <Nav.Link href="#tentang" className="text-white fw-semibold mx-2">
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
        </Navbar>

        <Container className="my-5">
          <Row>
              <Col md={8} className="mb-4 mb-md-0">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/assets/mobil1.webp"
                      alt="Mobil 1"
                      style={{ height: '350px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/assets/mobil2.webp"
                      alt="Mobil 2"
                      style={{ height: '350px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/assets/mobil3.webp"
                      alt="Mobil 3"
                      style={{ height: '350px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/assets/mobil4.webp"
                      alt="Mobil 4"
                      style={{ height: '350px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
            <Col md={4}>
              <Card className="h-100 shadow">
                <Card.Img variant="top" src="/assets/admin.webp" style={{ height: '200px', width: '200px', objectFit: 'cover', borderRadius: '50%', margin: '20px auto 0' }}/>
                <Card.Body>
                  <Card.Title style={{ fontSize: '1rem' }}>Admin Rental Iqra</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.875rem' }}>
                    <span>✅ Online</span><br />
                    <span>📧 Rental Iqra@admin</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="mb-5" id="layanan">
          <div  className=" bg-dark text-white p-4 rounded shadow">
            <p className="mb-1">Merek Kendaraan: Toyota Xenia</p>
            <p>Jumlah Seat: 6 Seat</p>
            <h6>Keterangan:</h6>
            <ul>
              <li>Harga diatas untuk durasi 24jam</li>
              <li>Harga sudah termasuk mobil+supir+BBM</li>
              <li>Harga tidak termasuk parkir, tiket masuk objek wisata dan makan sopir</li>
              <li>Harga tidak berlaku untuk liburan panjang (liburan sekolah, hari raya, akhir dan awal tahun)</li>
              <li>Free baby car seat untuk yg membutuhkan</li>
              <li>Tersedia test drive 🚗✨</li>
            </ul>
          </div>
        </Container>

        <Container className="py-5" style={{ backgroundColor: "#e0e0e0" }}>
        <h4 className="text-center mb-4">HARGA TOYOTA XENIA</h4>
        <hr style={{ borderTop: '5px solid #6b0f1a', width: '80%', margin: 'auto' }} />
        <Row className="justify-content-center mt-4">
          <Col md={6} className="d-flex justify-content-center">
            <div style={{padding: "10px", borderRadius: "8px" }} className="bg-dark">
              <img
                src="/assets/mobil4.webp"
                alt="Toyota Xenia"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>
          <Col md={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Toyota Xenia</td>
                  <td>Rp 250.000</td>
                </tr>
                <tr>
                  <td colSpan="2">Harga dapat berubah sewaktu-waktu</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>


      
        <MapsSection />
      

      <FooterSection />
        
    </Container>
  );
}
