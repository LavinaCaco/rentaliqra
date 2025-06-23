import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Table, Card, Spinner, Carousel  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhone } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";

export default function Sewa() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [mobil, setMobil] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchMobilDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/mobil/${id}`);
                setMobil(response.data);
            } catch (error) {
                console.error("Gagal mengambil detail mobil:", error);
                setMobil(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMobilDetail();
    }, [id]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!mobil) {
        return (
            <Container className="text-center my-5">
                <h2>Mobil Tidak Ditemukan</h2>
                <p>Maaf, mobil yang Anda cari tidak tersedia atau telah dihapus.</p>
                <Button onClick={() => navigate('/mobil')}>Kembali ke Daftar Mobil</Button>
            </Container>
        );
    }
    
    return (
        <Container fluid className="px-0" style={{ backgroundColor: '#f0f2f5', fontFamily: "Poppins" }}>
            <Navbar expand="lg" sticky="top" className="py-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
                <Container fluid className="px-4">
                    <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer", fontWeight: "bold", color: "white", fontSize: "28px" }}>
                        Rental IQRA
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar-nav" className="bg-light" />
                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="mx-auto my-2 my-lg-0">
                            <Nav.Link href="/" className="text-white fw-semibold mx-2">Beranda</Nav.Link>
                            <Nav.Link href="/mobil" className="text-white fw-semibold mx-2">Cari Mobil</Nav.Link>
                        </Nav>
                        <div className="d-flex align-items-center">
                            <Button href={`https://wa.me/6281341017966`} style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "#fff" }} className="d-flex align-items-center">
                                Kontak <FaPhone className="m-2" />
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="my-5">
                <Row>
                    <Col md={8} className="mb-4 mb-md-0">
                        <Card className="shadow-sm">
                             <Carousel fade>
                                {mobil.foto_depan && (
                                    <Carousel.Item>
                                        <img className="d-block w-100" src={`${API_URL}/storage/mobil/${mobil.foto_depan}`} alt="Tampak Depan" style={{ height: '450px', objectFit: 'cover', borderRadius: '8px' }}/>
                                    </Carousel.Item>
                                )}
                                {mobil.foto_belakang && (
                                    <Carousel.Item>
                                        <img className="d-block w-100" src={`${API_URL}/storage/mobil/${mobil.foto_belakang}`} alt="Tampak Belakang" style={{ height: '450px', objectFit: 'cover', borderRadius: '8px' }}/>
                                    </Carousel.Item>
                                )}
                                {mobil.foto_samping && (
                                    <Carousel.Item>
                                        <img className="d-block w-100" src={`${API_URL}/storage/mobil/${mobil.foto_samping}`} alt="Tampak Samping" style={{ height: '450px', objectFit: 'cover', borderRadius: '8px' }}/>
                                    </Carousel.Item>
                                )}
                                {mobil.foto_dalam && (
                                    <Carousel.Item>
                                        <img className="d-block w-100" src={`${API_URL}/storage/mobil/${mobil.foto_dalam}`} alt="Tampak Dalam" style={{ height: '450px', objectFit: 'cover', borderRadius: '8px' }}/>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </Card>
                    </Col>
                    <Col md={4}>
                         <Card className="h-100 shadow">
                            <Card.Body className="d-flex flex-column justify-content-center text-center">
                                <Card.Title as="h2" className="fw-bold">{mobil.merek}</Card.Title>
                                <Card.Text className="text-muted" style={{ fontSize: '1.25rem' }}>
                                    {mobil.tipe} | {mobil.seat} Kursi
                                </Card.Text>
                                <hr/>
                                <Card.Title as="h3" className="fw-bold text-danger mt-3">
                                    Rp {new Intl.NumberFormat('id-ID').format(mobil.harga)} / 24 Jam
                                </Card.Title>
                                <Button href={`https://wa.me/6281341017966?text=Halo,%20saya%20tertarik%20untuk%20menyewa%20mobil%20${mobil.merek}`} target="_blank" variant="success" size="lg" className="mt-4 w-100">
                                    Sewa Sekarang via WhatsApp
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="mb-5" id="layanan">
                <div className=" bg-dark text-white p-4 rounded shadow">
                    <h6>Keterangan:</h6>
                    <p>{mobil.keterangan || 'Tidak ada keterangan tambahan.'}</p>
                </div>
            </Container>

           
            <Container className="py-5">
                <h4 className="text-center mb-4 text-uppercase fw-bold">HARGA {mobil.merek}</h4>
                <hr style={{ borderTop: '3px solid #dee2e6', width: '10%', margin: 'auto' }} />
                <Row className="justify-content-center mt-4 align-items-center">
                    <Col md={6} className="d-flex justify-content-center mb-3 mb-md-0">
                        <div style={{ padding: "10px", borderRadius: "8px" }} className="bg-dark shadow">
                             <img
                                src={`${API_URL}/storage/mobil/${mobil.foto_depan}`}
                                alt={mobil.merek}
                                style={{ maxWidth: "100%", height: "auto", maxHeight: "400px", objectFit: "contain" }}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <Table striped bordered hover className="shadow-sm">
                            <thead>
                                <tr>
                                    <th>Merek</th>
                                    <th>Tipe</th>
                                    <th>Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{mobil.merek}</td>
                                    <td>{mobil.tipe}</td>
                                    <td>Rp {new Intl.NumberFormat('id-ID').format(mobil.harga)}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="text-muted fst-italic">Harga dapat berubah sewaktu-waktu</td>
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