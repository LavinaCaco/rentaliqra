import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Image, Card, InputGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCar, FaMoneyBillWave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Mobil() {
const navigate = useNavigate();
  return (
    <div style={{ fontFamily: 'sans-serif' }}>

      <Navbar bg="white" expand="lg" className="border-bottom px-4 ">
        <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="fw-bold text-danger d-flex align-items-center">
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

      <div className="py-4 my-4" id="layanan">
        <h1 className="fw-bold text-center">Disini Rental Iqra </h1>
        <h5 className="fw-bold text-center">Merekomendasi Mobil Untuk Anda</h5>
      </div>

      <div>
        <Container className="pt-3 py-4 my-4">
          <Row className="g-3">
            <Col md={4}>
                <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil4.png" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
               <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil3.jpg" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
               <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil3.jpg" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
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
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil4.png" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil4.png" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
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
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
               <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil4.png" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
               <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src="/assets/mobil4.png" 
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                <Card.Body>
                  <Card.Title className='fw-bold'>Rp.250.000/24h</Card.Title>
                  <Card.Text>
                    Toyota Xenia 2013
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="dark" onClick={() => navigate('/sewa')}>Sewa</Button>
                </Card.Footer>
              </Card>
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
