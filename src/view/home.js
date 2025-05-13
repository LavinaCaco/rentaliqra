import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Image, Card, InputGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCar, FaMoneyBillWave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaCartPlus, FaCheckSquare   } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: 'sans-serif' }}>

      <Navbar bg="white" expand="lg" className="border-bottom px-4 ">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold text-danger d-flex align-items-center">
            Rental Iqra
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#beranda">Beranda</Nav.Link>
              <Nav.Link href="#layanan">Layanan</Nav.Link>
              <Nav.Link href="#info">Info</Nav.Link>
              <Nav.Link href="#lokasi">Lokasi</Nav.Link>
              <Nav.Link href="#kontak">Kontak</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ 
        background: 'linear-gradient(90deg, #1a1a3f, #6b0f1a)', 
        color: 'white',
        minHeight: '500px' 
      }} 
        className="py-5">
        <Container className="pt-3 py-4 my-4" id="beranda">
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold">MEMBANTU MEMPERMUDAH PERJALANAN ANDA.</h1>
              <p className="mt-3">
                <strong>Rental Iqra</strong> hadir untuk menjawab kebutuhan mobilitas Anda dengan layanan rental mobil
                premium yang siap antar jemput kapan saja, ke mana saja, tanpa ribet dan penuh kepastian!
              </p>
              <Button href="#info" variant="danger" className="mt-3 px-4 py-2 fw-bold">
                CARI MOBIL
              </Button>
            </Col>
            <Col md={6}>
              <div className="ps-4">
                <Row className="g-2">
                  <Col xs={6}>
                    <Image
                      src="/assets/mobil4.png"
                      alt="Mobil 1"
                      fluid
                      rounded
                      style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                    />
                  </Col>
                  <Col xs={6}>
                    <Image
                      src="/assets/mobil3.jpg"
                      alt="Mobil 2"
                      fluid
                      rounded
                      style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                    />
                  </Col>
                  <Col xs={12} className="d-flex justify-content-center">
                    <Image
                      src="/assets/mobil1.jpg"
                      alt="Mobil 3"
                      rounded
                      style={{ height: '150px', objectFit: 'cover', width: '70%' }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="py-4 my-4" id="layanan">
        <h1 className="fw-bold text-center">Layanan Kami </h1>
        <h5 className="fw-bold text-center">Rental Iqra Hadir Untuk Membantu Perjalanan Anda</h5>
      </div>

      <div>
        <Container className="pt-3 py-4 my-4 text-center my-5">
          <Row className="g-3">
            <Col md={4}>
              <Card className="h-100">
                <div className="d-flex justify-content-center align-items-center py-4">
                  <FaCartPlus style={{ fontSize: '50px' }} />
                </div>
                <Card.Body>
                   <h5 style={{ color: 'darkred', fontWeight: 'bold', marginBottom: '10px' }}>
                     SEWA MUDAH
                   </h5>
                  <Card.Text>
                    Sewa mobil sekarang makin gampang! Di Rental Iqra, cukup klik, pilih mobil, dan langsung jalan. Sewa mudah, tanpa ribet, tanpa drama!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">_______________</small>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <div className="d-flex justify-content-center align-items-center py-4">
                  <FaMoneyBillWave  style={{ fontSize: '50px' }} />
                </div>
                <Card.Body>
                  <h5 style={{ color: 'darkred', fontWeight: 'bold', marginBottom: '10px' }}>
                     HARGA MURAH
                  </h5>                
                  <Card.Text>
                    Mau jalan-jalan tapi takut dompet menipis? Tenang, Rental Iqra punya harga mudah yang ramah di kantong, tapi tetap kasih kenyamanan maksimal. 
                    Sewa mobil jadi hemat, praktis, dan pastinya bikin senyum terus sepanjang perjalanan!                  
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">_______________</small>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <div className="d-flex justify-content-center align-items-center py-4">
                  <FaCheckSquare  style={{ fontSize: '50px' }} />
                </div>
                <Card.Body>
                  <h5 style={{ color: 'darkred', fontWeight: 'bold', marginBottom: '10px' }}>
                     KUALITAS TERJAMIN
                  </h5> 
                  <Card.Text>
                    Di Rental Iqra semua mobil sudah rutin service setiap bulan, jadi tidak perlu kawatir tentang kondisi mobil yang sedang disewa. Dipastikan aman.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">_______________</small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        style={{
          backgroundImage: 'url("/assets/bgcari.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container>
          <Row className="justify-content-center" id="info">
            <Col md={10} lg={8}>
              <h1 className="fw-bold mb-3">Temukan Mobil Kebutuhanmu.</h1>
              <p className="mb-4">
                Temukan mobil yang pas untuk setiap kebutuhanmu—harian, mingguan, atau perjalanan jauh—di Cacomel Trans. Proses mudah, armada siap jalan!
              </p>

              <div className="bg-white rounded shadow p-3" style={{ color: '#333' }}>
                <div className="d-flex mb-3">
                  <Button variant="light" className="me-2 active">Sewa</Button>
                  <Button variant="light">Tour</Button>
                </div>

                <Row className="g-2 align-items-center">
                  <Col md>
                    <InputGroup>
                      <InputGroup.Text><FaCar /></InputGroup.Text>
                      <Form.Select>
                        <option>Tipe mobil</option>
                        <option>MPV</option>
                        <option>SUV</option>
                        <option>City Car</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>

                  <Col md>
                    <InputGroup>
                      <InputGroup.Text><FaMoneyBillWave /></InputGroup.Text>
                      <Form.Select>
                        <option>Range Harga Sewa</option>
                        <option>&lt; Rp 300.000</option>
                        <option>Rp 300.000 - 500.000</option>
                        <option>&gt; Rp 500.000</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>

                  <Col md>
                    <Form.Control type="text" placeholder="Cari Berdasarkan Lokasi Anda" />
                  </Col>

                  <Col md="auto">
                    <Button  onClick={() => navigate('/mobil')} variant="dark"  className="w-100 px-4">Cari</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <Container className="my-5">
        <Row className='w-100'>
          <Col lg={6} className='my-4'>
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
          <Col lg={6} className='my-4 d-flex align-items-center' id="lokasi">
            <div>
              <h6>Lokasi Kami di Yogyakarta</h6>
              <p>Kunjungi kami langsung untuk melihat armada dan layanan kami secara langsung.</p>
              <p>Kami berada di pusat kota Yogyakarta, mudah diakses dan strategis.</p>
              <p>Pastikan untuk mengatur jadwal kedatangan Anda terlebih dahulu untuk layanan terbaik.</p>
            </div>
          </Col>
          </Row>
        </Container>
      </div>

      <div
      style={{
        backgroundImage: 'url("/assets/bglayanan.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: 'white',
        padding: '4rem 0',
      }}
     >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
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
    </div>   
  );
}
