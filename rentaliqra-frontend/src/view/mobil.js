import React, { Suspense, lazy, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import SearchSection from "../components/SearchMobilSection";
import FooterSection from "../components/FooterSection";
import MapsSection from "../components/MapsSection";
import WhatsAppFAB from "../components/WhatsAppFAB";
const NavbarSection = lazy(() => import("../components/NavbarSection"));

export default function Mobil() {
    const navigate = useNavigate();
    
    const [mobils, setMobils] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [filterTipe, setFilterTipe] = useState('');
    const [filterHarga, setFilterHarga] = useState('');

    const API_URL = 'http://127.0.0.1:8000';

    const fetchMobils = async (filters = {}) => {
        try {
            setLoading(true);
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v != null && v !== '')
            );
            
            const response = await axios.get(`${API_URL}/api/mobil`, { params: cleanFilters });
            setMobils(response.data);
        } catch (error) {
            console.error("Gagal mengambil data mobil:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMobils();
    }, []);

    const handleSearch = () => {
        const filters = {
            tipe: filterTipe,
            harga: filterHarga,
        };
        fetchMobils(filters);
    };

    const handleSewaClick = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(`/sewa/${id}`);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f7f4', fontFamily: "Poppins" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <NavbarSection />
            </Suspense>

            <div className="py-4 my-4" id="layanan">
                <h1 className="fw-bold text-center">Temukan Mobil Kebutuhanmu.</h1>
            </div>
            
            <SearchSection
                filterTipe={filterTipe}
                setFilterTipe={setFilterTipe}
                filterHarga={filterHarga}
                setFilterHarga={setFilterHarga}
                handleSearch={handleSearch}
            />

            <Container className="pt-5 pb-4 my-4">
                <Row className="g-4">
                    {loading ? (
                        <Col className="text-center"><Spinner animation="border" /></Col>
                    ) : mobils.length > 0 ? (
                        mobils.map((mobil) => (
                            <Col md={4} key={mobil.id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={`${API_URL}/storage/mobil/${mobil.foto_depan}`}
                                        style={{ height: "250px", objectFit: "cover" }}
                                        alt={mobil.merek}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(mobil.harga)}/24h</Card.Title>
                                        <Card.Text><span className="fw-bold">{mobil.tipe}</span> | {mobil.seat} Kursi</Card.Text>
                                        <Card.Text>{mobil.merek}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="border-0 bg-white">
                                        <Button variant="dark" className="w-100" onClick={() => handleSewaClick(mobil.id)}>
                                            Sewa
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <h4>Mobil tidak ditemukan</h4>
                            <p>Coba ubah kriteria pencarian Anda.</p>
                        </Col>
                    )}
                </Row>
            </Container>

            <MapsSection />
            <WhatsAppFAB />
            <FooterSection />

            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Login Diperlukan</Modal.Title></Modal.Header>
                <Modal.Body>Anda harus login atau register terlebih dahulu untuk dapat menyewa mobil.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowLoginModal(false); navigate('/register'); }}>Register</Button>
                    <Button variant="primary" onClick={() => { setShowLoginModal(false); navigate('/login'); }}>Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}