import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarSection from '../components/NavbarSection';
import FooterSection from '../components/FooterSection';

const RiwayatPesanan = () => {
    const [pesananList, setPesananList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    
    const API_URL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchPesanan = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/pesanan-saya`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPesananList(response.data);
            } catch (error) {
                console.error("Gagal mengambil data pesanan:", error.response || error);
                setNotification({ show: true, message: 'Gagal mengambil riwayat pesanan Anda.', type: 'danger' });
            } finally {
                setLoading(false);
            }
        };

        fetchPesanan();
    }, [token, navigate]); 

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
                                                        {pesanan.status === 'selesai' && (
                                                            <Button variant="outline-primary" size="sm" disabled>
                                                                Beri Review
                                                            </Button>
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
        </div>
    );
};

export default RiwayatPesanan;
