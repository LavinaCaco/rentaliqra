import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Spinner, Alert, Badge, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import NavbarSection from '../components/NavbarSection';
import FooterSection from '../components/FooterSection';
import StarRating from '../components/StarRating';

const RiwayatPesanan = () => {
    const [pesananList, setPesananList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedSewa, setSelectedSewa] = useState(null);

    const API_URL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchPesanan = async () => {
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/pesanan-saya`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPesananList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data pesanan:", error);
            setNotification({ show: true, message: 'Gagal mengambil riwayat pesanan Anda.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPesanan();
    }, []);

    const handleOpenReviewModal = (sewa) => {
        setSelectedSewa(sewa);
        setShowReviewModal(true);
    };
    const handleCloseReviewModal = () => {
        setSelectedSewa(null);
        setShowReviewModal(false);
    };

    const reviewSchema = yup.object().shape({
        rating: yup.number().min(1, 'Anda harus memilih setidaknya 1 bintang.').required(),
        komentar: yup.string().nullable(),
    });

    const handleReviewSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            setSubmitting(true);
            const response = await axios.post(`${API_URL}/api/sewa/${selectedSewa.id}/reviews`, values, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotification({ show: true, message: response.data.message, type: 'success' });
            fetchPesanan();
            handleCloseReviewModal();
        } catch (error) {
            setStatus({ error: error.response?.data?.message || 'Gagal mengirim review.' });
            console.error("Error saat mengirim review:", error.response);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f7f4' }}>
            <NavbarSection />
            <main style={{ flex: '1 0 auto' }}>
                <Container className="py-5">
                    <h2 className="mb-4">Riwayat Pesanan Saya</h2>
                    {notification.show && (
                        <Alert variant={notification.type} onClose={() => setNotification({ ...notification, show: false })} dismissible>
                            {notification.message}
                        </Alert>
                    )}
                    <Card className="shadow-sm">
                        <Card.Body>
                            {loading ? (
                                <div className="text-center p-5"><Spinner animation="border" /></div>
                            ) : (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mobil</th>
                                            <th>Tgl Sewa</th>
                                            <th>Tgl Kembali</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pesananList.length > 0 ? (
                                            pesananList.map((pesanan, index) => (
                                                <tr key={pesanan.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{pesanan.mobil ? `${pesanan.mobil.merek} (${pesanan.mobil.tipe})` : 'Data Mobil Dihapus'}</td>
                                                    <td>{new Date(pesanan.tanggal_sewa).toLocaleDateString('id-ID')}</td>
                                                    <td>{pesanan.tanggal_kembali ? new Date(pesanan.tanggal_kembali).toLocaleDateString('id-ID') : '-'}</td>
                                                    <td>
                                                        <Badge bg={pesanan.status === 'selesai' ? 'primary' : 'warning'} className="text-capitalize">
                                                            {pesanan.status}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        {pesanan.status === 'selesai' && !pesanan.review && (
                                                            <Button variant="outline-primary" size="sm" onClick={() => handleOpenReviewModal(pesanan)}>
                                                                Beri Review
                                                            </Button>
                                                        )}

                                                        {pesanan.review && (
                                                            <Badge bg="success" size="sm" disabled>
                                                                Telah Direview
                                                            </Badge>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6" className="text-center">Anda belum memiliki riwayat pesanan.</td></tr>
                                        )}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </main>
            <FooterSection />

            <Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
                <Formik
                    validationSchema={reviewSchema}
                    onSubmit={handleReviewSubmit}
                    initialValues={{ rating: 0, komentar: '' }}
                >
                    {({ handleSubmit, setFieldValue, values, errors, status, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Beri Review untuk {selectedSewa?.mobil?.merek}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {status && status.error && <Alert variant="danger">{status.error}</Alert>}
                                <Form.Group className="mb-3 text-center">
                                    <Form.Label className="d-block">Rating Anda</Form.Label>
                                    <StarRating rating={values.rating} setRating={(rating) => setFieldValue('rating', rating)} />
                                    {errors.rating && <div className="text-danger mt-1" style={{fontSize: '0.875em'}}>{errors.rating}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Komentar Anda (Opsional)</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={4} 
                                        name="komentar" 
                                        value={values.komentar} 
                                        onChange={(e) => setFieldValue('komentar', e.target.value)} 
                                        placeholder="Bagaimana pengalaman Anda dengan mobil dan layanan kami?"
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseReviewModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default RiwayatPesanan;
