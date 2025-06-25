import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

const ManajemenSewa = () => {
    const [sewaList, setSewaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    
    const API_URL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('token');

    const fetchSewa = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/sewa`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setSewaList(response.data);
        } catch (error) {
            console.error("Gagal mengambil data sewa:", error);
            setNotification({ show: true, message: 'Gagal mengambil data penyewaan.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSewa();
    }, []);

    const handleSelesaikan = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menyelesaikan penyewaan ini? Status mobil akan kembali "Ready".')) {
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/api/sewa/${id}/complete`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotification({ show: true, message: response.data.message, type: 'success' });
            fetchSewa();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal menyelesaikan penyewaan.';
            setNotification({ show: true, message: errorMessage, type: 'danger' });
        }
    };

    return (
        <Container fluid>
            {notification.show && (
                <Alert variant={notification.type} onClose={() => setNotification({ ...notification, show: false })} dismissible>
                    {notification.message}
                </Alert>
            )}

            <Card>
                <Card.Header>
                    <Card.Title as="h4">Manajemen Penyewaan</Card.Title>
                    <p className="card-category">Daftar semua transaksi penyewaan mobil.</p>
                </Card.Header>
                <Card.Body>
                    {loading ? (
                        <div className="text-center"><Spinner animation="border" /></div>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Penyewa</th>
                                    <th>Mobil</th>
                                    <th>Tgl Sewa</th>
                                    <th>Tgl Kembali</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sewaList.length > 0 ? (
                                    sewaList.map((sewa, index) => (
                                        <tr key={sewa.id}>
                                            <td>{index + 1}</td>
                                            <td>{sewa.user.first_name} {sewa.user.last_name}</td>
                                            <td>{sewa.mobil.merek} ({sewa.mobil.tipe})</td>
                                            <td>{new Date(sewa.tanggal_sewa).toLocaleDateString('id-ID')}</td>
                                            <td>{sewa.tanggal_kembali ? new Date(sewa.tanggal_kembali).toLocaleDateString('id-ID') : '-'}</td>
                                            <td>
                                                <Badge bg={sewa.status === 'selesai' ? 'primary' : 'warning'} className="text-capitalize">
                                                    {sewa.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                {sewa.status === 'disewa' && (
                                                    <Button variant="success" size="sm" onClick={() => handleSelesaikan(sewa.id)}>
                                                        Selesaikan
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="7" className="text-center">Belum ada data penyewaan.</td></tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ManajemenSewa;
