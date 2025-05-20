import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Image, Card, InputGroup, Form, Table, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCar, FaMoneyBillWave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavbarSection from "../components/NavbarSection";



export default function Sewa() {
const navigate = useNavigate();
  return (
    
    <Container fluid className="px-0" style={{ backgroundColor: '#e0e0e0' }}>
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


     
      <Container className="mb-5">
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5754.614347125093!2d110.41302848556319!3d-7.7593866161297536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversitas%20Amikom%20Yogyakarta!5e0!3m2!1sid!2sid!4v1746582534275!5m2!1sid!2sid'
              className='w-100'
              height='400'
              style={{ border: 0 }}
              allowFullScreen=""
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </Col>
          <Col lg={6} className="d-flex align-items-center" id="lokasi">
            <div>
              <h6>Lokasi Kami di Yogyakarta</h6>
              <p>Kunjungi kami langsung untuk melihat armada dan layanan kami secara langsung.</p>
              <p>Kami berada di pusat kota Yogyakarta, mudah diakses dan strategis.</p>
              <p>Pastikan untuk mengatur jadwal kedatangan Anda terlebih dahulu untuk layanan terbaik.</p>
            </div>
          </Col>
        </Row>
      </Container>

      <div
        style={{
          backgroundImage: 'url("/assets/bglayanan.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
          padding: '4rem 0'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1
          }}
        ></div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row>
            <Col md={6} id="kontak">
              <h2 className="fw-bold">Butuh Konsultasi?</h2>
              <h3 className="fw-bold">Silahkan Kontak Kami</h3>
              <h3 className="fw-bold mb-4">Kami Siap Membantu</h3>

              <h5 className="fw-bold">Kontak</h5>
              <p><FaMapMarkerAlt className="me-2" />Jl. Inajadulugasi 123, Sleman, Yogyakarta, Indonesia</p>
              <p><FaPhone className="me-2" />(+62) 8123456789</p>
              <p><FaEnvelope className="me-2" />Rental Iqra@gmail.com</p>

              <h5 className="fw-bold mt-4">Social Media</h5>
              <div className="d-flex align-items-center">
                <a href="#" className="text-white me-3 fs-5"><FaFacebookF /></a>
                <a href="#" className="text-white me-3 fs-5"><FaInstagram /></a>
                <a href="#" className="text-white me-3 fs-5"><FaTwitter /></a>
                <span>@Rental IqraIndonesia</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
 
  
  );
}
