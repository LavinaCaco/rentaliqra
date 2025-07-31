import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal, Badge, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import api from '../utils/axios';
import appPath from '../utils/path';

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

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 9;


    const fetchMobils = useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v != null && v !== '')
            );

            const response = await api.get(`/mobil`, {
                params: {
                    ...cleanFilters,
                    page: currentPage,       
                    per_page: itemsPerPage   
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setMobils(response.data.data);
                setCurrentPage(response.data.current_page || 1); 
                setLastPage(response.data.last_page || 1);       
                setTotalItems(response.data.total || 0);        
            } else {
                console.error("Struktur respons API tidak sesuai:", response.data);
                setMobils([]); 
                setCurrentPage(1);
                setLastPage(1);
                setTotalItems(0);
            }

        } catch (error) {
            console.error("Gagal mengambil data mobil:", error);
            setMobils([]); 
            setCurrentPage(1);
            setLastPage(1);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    }, [appPath.APP_URL, currentPage, itemsPerPage]); 

    useEffect(() => {
        fetchMobils({ tipe: filterTipe, harga: filterHarga });
    }, [fetchMobils, filterTipe, filterHarga]);

    const handleSearch = () => {
        setCurrentPage(1); 
    };

    const handleSewaClick = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(`/sewa/${id}`);
        } else {
            setShowLoginModal(true);
        }
    };

    const renderPaginationItems = () => {
        let items = [];
        for (let number = 1; number <= lastPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage} 
                    onClick={() => setCurrentPage(number)} 
                >
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
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
                                <Card className="h-100 shadow-sm position-relative">
                                    <Badge
                                        bg={mobil.status === 'ready' ? 'success' : 'warning'}
                                        className="position-absolute top-0 end-0 m-2 p-2 text-capitalize"
                                        style={{ zIndex: 1 }}
                                    >
                                        {mobil.status}
                                    </Badge>
                                    <Card.Img
                                        variant="top"
                                        src={`${appPath.APP_URL}/storage/mobil/${mobil.foto_depan}`}
                                        style={{ height: "250px", objectFit: "cover" }}
                                        alt={mobil.merek}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Rp.{new Intl.NumberFormat('id-ID').format(mobil.harga)}/24h</Card.Title>
                                        <Card.Text><span className="fw-bold">{mobil.tipe}</span> | {mobil.seat} Kursi</Card.Text>
                                        <Card.Text>{mobil.merek}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="border-0 bg-white">
                                        <Button
                                            variant="dark"
                                            className="w-100"
                                            onClick={() => handleSewaClick(mobil.id)}
                                            disabled={mobil.status !== 'ready'}
                                        >
                                            {mobil.status === 'ready' ? 'Sewa' : 'Disewa'}
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

                {totalItems > itemsPerPage && (
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-center">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                />
                                {renderPaginationItems()}
                                <Pagination.Next
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
                                    disabled={currentPage === lastPage} 
                                />
                            </Pagination>
                        </Col>
                    </Row>
                )}
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