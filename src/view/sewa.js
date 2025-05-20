import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Image, Card, InputGroup, Form, Table, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCar, FaMoneyBillWave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";




export default function Sewa() {
const navigate = useNavigate();
  return (
    
    <Container fluid className="px-0" style={{ backgroundColor: '#e0e0e0', fontFamily: "Poppins"  }} >
      <NavbarSection />
      <Container className="my-5">
        <Row>
            <Col md={8} className="mb-4 mb-md-0">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/assets/mobil1.jpg"
                    alt="Mobil 1"
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/assets/mobil2.jpg"
                    alt="Mobil 2"
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/assets/mobil3.jpg"
                    alt="Mobil 3"
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/assets/mobil4.png"
                    alt="Mobil 4"
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src="/assets/admin.png" style={{ height: '200px', width: '200px', objectFit: 'cover', borderRadius: '50%', margin: '20px auto 0' }}/>
              <Card.Body>
                <Card.Title style={{ fontSize: '1rem' }}>Admin Cacomel Trans</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: '0.875rem' }}>
                  <span>✅ Online</span><br />
                  <span>📧 Rental Iqra@admin</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mb-5">
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
              src="/assets/mobil4.png"
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
