import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Table, Card, Spinner, Alert, Badge, Modal, Form, Carousel, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhone } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";


const PriceCalculator = ({ mobil }) => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        if (values.tanggal_mulai && values.tanggal_kembali) {
            const tglMulai = new Date(values.tanggal_mulai);
            const tglKembali = new Date(values.tanggal_kembali);

            if (tglKembali >= tglMulai) {
                const diffTime = Math.abs(tglKembali - tglMulai);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                const total = diffDays * mobil.harga;
                setFieldValue('total_harga', total);
            } else {
                setFieldValue('total_harga', 0);
            }
        } else {
            setFieldValue('total_harga', 0);
        }
    }, [values.tanggal_mulai, values.tanggal_kembali, setFieldValue, mobil.harga]);

    return null; 
};


export default function Sewa() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [mobil, setMobil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    
    const [showSewaModal, setShowSewaModal] = useState(false);
    const [mainImage, setMainImage] = useState('');

    const [user, setUser] = useState(null);

    const API_URL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMobilDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/mobil/${id}`);
                setMobil(response.data);
                if (response.data.foto_depan) {
                    setMainImage(response.data.foto_depan);
                }
            } catch (error) {
                console.error("Gagal mengambil detail mobil:", error);
                setMobil(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMobilDetail();
        }
        
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [id]);

    const handleOpenSewaModal = () => {
        if (!token) {
            alert('Anda harus login terlebih dahulu untuk menyewa mobil.');
            navigate('/login');
            return;
        }
        setShowSewaModal(true);
    };

    const handleCloseSewaModal = () => setShowSewaModal(false);
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const sewaSchema = yup.object().shape({
        tanggal_mulai: yup.date().required('Tanggal mulai sewa wajib diisi.').min(new Date(new Date().setHours(0,0,0,0)), 'Tanggal mulai tidak boleh hari yang lalu.'),
        tanggal_kembali: yup.date().required('Tanggal kembali wajib diisi.').min(yup.ref('tanggal_mulai'), 'Tanggal kembali tidak boleh sebelum tanggal mulai.'),
        total_harga: yup.number(),
    });

    const handleSewaSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            setSubmitting(true);
            const response = await axios.post(`${API_URL}/api/sewa`, 
                {
                    mobil_id: mobil.id,
                    tanggal_mulai: values.tanggal_mulai,
                    tanggal_kembali: values.tanggal_kembali,
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            setNotification({ show: true, message: response.data.message, type: 'success' });
            setMobil({ ...mobil, status: 'disewa' });
            handleCloseSewaModal();

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal memproses permintaan sewa.';
            setStatus({ error: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return ( <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spinner animation="border" /></Container> );
    }

    if (!mobil) {
        return ( <Container className="text-center my-5"><h2>Mobil Tidak Ditemukan</h2><p>Maaf, mobil yang Anda cari tidak tersedia.</p><Button onClick={() => navigate('/mobil')}>Kembali</Button></Container> );
    }
    
    const fotoSlides = [
        mobil.foto_depan,
        mobil.foto_belakang,
        mobil.foto_samping,
        mobil.foto_dalam
    ].filter(Boolean);

    return (
        <Container fluid className="px-0" style={{ backgroundColor: '#f0f2f5', fontFamily: "Poppins" }}>
            <Navbar
                expand="lg"
                sticky="top"
                className="py-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
            >
                <Container fluid className="px-4">
                    <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer", fontWeight: "bold", color: "white", fontSize: "28px", letterSpacing: "1px" }}>
                        Rental IQRA
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar-nav" className="bg-light" />
                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="mx-auto my-2 my-lg-0">
                            <Nav.Link onClick={() => navigate('/')} className="text-white fw-semibold mx-2" style={{cursor: 'pointer'}}>Beranda</Nav.Link>
                            <Nav.Link onClick={() => navigate('/mobil')} className="text-white fw-semibold mx-2" style={{cursor: 'pointer'}}>Cari Mobil</Nav.Link>
                        </Nav>
                        <div className="d-flex align-items-center">
                            {user ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" className="text-dark bg-white border-0">
                                        {user.first_name} {user.last_name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item onClick={() => navigate('/pesanan')}>Pesanan Saya</Dropdown.Item>
                                        <Dropdown.Divider />
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
            
            <Container>
                 {notification.show && (
                    <Alert variant={notification.type} onClose={() => setNotification({ show: false })} dismissible className="mt-3">
                        {notification.message}
                    </Alert>
                )}
            </Container>

            <Container className="my-5">
                <Row>
                    <Col md={8} className="mb-4 mb-md-0">
                         <Card className="shadow-sm position-relative">
                            <Badge bg={mobil.status === 'ready' ? 'success' : 'warning'} className="position-absolute top-0 end-0 m-3 p-2 fs-6 text-capitalize" style={{ zIndex: 10 }}>
                                {mobil.status}
                            </Badge>
                            <Carousel fade interval={null}>
                                {fotoSlides.length > 0 ? (
                                    fotoSlides.map((foto, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={`${API_URL}/storage/mobil/${foto}`}
                                                alt={`Slide ${index + 1} - ${mobil.merek}`}
                                                style={{ height: '450px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        </Carousel.Item>
                                    ))
                                ) : (
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://placehold.co/800x450/E9ECEF/495057?text=Gambar+Tidak+Tersedia"
                                            alt="Gambar Tidak Tersedia"
                                            style={{ height: '450px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
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
                                
                                {mobil.status === 'ready' ? (
                                    <Button onClick={handleOpenSewaModal} variant="success" size="lg" className="mt-4 w-100">
                                        Sewa Mobil Ini
                                    </Button>
                                ) : (
                                    <Button variant="secondary" size="lg" className="mt-4 w-100" disabled>
                                        Sedang Disewa
                                    </Button>
                                )}
                                <Button href={`https://wa.me/6281341017966?text=Halo,%20saya%20ingin%20bertanya%20tentang%20mobil%20${mobil.merek}`} target="_blank" variant="outline-success" size="sm" className="mt-2 w-100">
                                    Tanya via WhatsApp
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

            {mobil && (
                <Modal show={showSewaModal} onHide={handleCloseSewaModal} size="lg" centered>
                    <Formik
                        validationSchema={sewaSchema}
                        onSubmit={handleSewaSubmit}
                        initialValues={{ tanggal_mulai: '', tanggal_kembali: '', total_harga: 0 }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors, status, isSubmitting }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Sewa Mobil: {mobil.merek}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {status && status.error && <Alert variant="danger" className="mb-3">{status.error}</Alert>}
                                    <Row>
                                        <Col md={6}>
                                            <h5 className="mb-3">Galeri Foto</h5>
                                            <div className="main-image mb-3">
                                                <img src={`${API_URL}/storage/mobil/${mainImage}`} alt="Tampilan utama" className="w-100 rounded shadow-sm" style={{height: '250px', objectFit: 'cover'}}/>
                                            </div>
                                            <div className="thumbnail-images d-flex gap-2 flex-wrap">
                                                {fotoSlides.map((foto, index) => (
                                                    <img 
                                                        key={index}
                                                        src={`${API_URL}/storage/mobil/${foto}`}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="rounded shadow-sm"
                                                        style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer', border: mainImage === foto ? '3px solid #0d6efd' : '3px solid transparent' }}
                                                        onClick={() => setMainImage(foto)}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h5 className="mb-3">Formulir Penyewaan</h5>
                                            <Form.Group className="mb-3" controlId="formTanggalMulai">
                                                <Form.Label>Tanggal Mulai Sewa</Form.Label>
                                                <Form.Control type="date" name="tanggal_mulai" value={values.tanggal_mulai} onChange={handleChange} isInvalid={touched.tanggal_mulai && !!errors.tanggal_mulai}/>
                                                <Form.Control.Feedback type="invalid">{errors.tanggal_mulai}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formTanggalKembali">
                                                <Form.Label>Tanggal Selesai Sewa</Form.Label>
                                                <Form.Control type="date" name="tanggal_kembali" value={values.tanggal_kembali} onChange={handleChange} isInvalid={touched.tanggal_kembali && !!errors.tanggal_kembali}/>
                                                <Form.Control.Feedback type="invalid">{errors.tanggal_kembali}</Form.Control.Feedback>
                                            </Form.Group>
                                            <div className='mt-4 p-3 bg-light rounded'>
                                                <h6 className="mb-2">Rincian Biaya</h6>
                                                <div className="d-flex justify-content-between text-muted">
                                                    <span>Harga per hari:</span>
                                                    <span>Rp {new Intl.NumberFormat('id-ID').format(mobil.harga)}</span>
                                                </div>
                                                <hr className="my-2"/>
                                                <div className="d-flex justify-content-between fw-bold">
                                                    <span>Estimasi Total Harga:</span>
                                                    <span>Rp {new Intl.NumberFormat('id-ID').format(values.total_harga || 0)}</span>
                                                </div>
                                                <p className='text-muted mt-2 mb-0' style={{fontSize: '0.8rem'}}>(Jika ada kerusakan pada mobil, penyewa harus membayar perbaikan kerusakan pada mobil sewaan )</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <PriceCalculator mobil={mobil} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseSewaModal}>Batal</Button>
                                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Memproses...' : 'Sewa'}
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}
        </Container>
    );
}
