import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import NavbarSection from '../components/NavbarSection';
import FooterSection from '../components/FooterSection';

const StarDisplay = ({ rating }) => {
    return (
        <div>
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    size={20}
                    color={index < rating ? '#ffc107' : '#e4e5e9'}
                    style={{ marginRight: '2px' }}
                />
            ))}
        </div>
    );
};

const Ulasan = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/reviews`);
                setReviews(response.data);
            } catch (err) {
                setError('Gagal memuat data ulasan.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f7f4' }}>
            <NavbarSection />
            <main style={{ flex: '1 0 auto' }}>
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <h1 className="fw-bold">Ulasan Pelanggan Kami</h1>
                        <p className="text-muted">Lihat apa kata mereka yang sudah merasakan layanan kami.</p>
                    </div>
                    
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    {loading ? (
                        <div className="text-center"><Spinner animation="border" /></div>
                    ) : (
                        <Row>
                            {reviews.length > 0 ? (
                                reviews.map(review => (
                                    <Col md={6} lg={4} key={review.id} className="mb-4">
                                        <Card className="h-100 shadow-sm">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <Card.Title as="h6" className="mb-0">{review.user.first_name} {review.user.last_name}</Card.Title>
                                                    <StarDisplay rating={review.rating} />
                                                </div>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    Mereview mobil: {review.mobil.merek}
                                                </Card.Subtitle>
                                                <blockquote className="blockquote mb-0 mt-3">
                                                    <p style={{fontSize: '0.95rem'}}>"{review.komentar}"</p>
                                                    <footer className="blockquote-footer mt-1" style={{fontSize: '0.8rem'}}>
                                                        Direview pada {new Date(review.created_at).toLocaleDateString('id-ID')}
                                                    </footer>
                                                </blockquote>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col className="text-center">
                                    <p>Belum ada ulasan yang masuk.</p>
                                </Col>
                            )}
                        </Row>
                    )}
                </Container>
            </main>
            <FooterSection />
        </div>
    );
};

export default Ulasan;
