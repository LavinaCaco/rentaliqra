import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Table } from 'react-bootstrap';
import { FaCar, FaCarSide, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_mobil: 0,
    mobil_tersedia: 0,
    mobil_disewa: 0,
  });

  const [penggunaTerbaru, setPenggunaTerbaru] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://127.0.0.1:8000';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setError('Autentikasi Gagal. Silakan login kembali.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setStats(response.data);
        setPenggunaTerbaru(response.data.pengguna_terbaru || []);
      } catch (err) {
        setError('Gagal memuat data statistik.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <Container fluid>
            <h4 className='mb-3'></h4>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="text-center p-5"><Spinner animation="border" /></div>
            ) : (
                <Row>
                    <Col lg="4" md="6" className="mb-4">
                        <Card className="border-primary border-start border-5 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="me-3 text-primary">
                                    <FaCar size={40} />
                                </div>
                                <div>
                                    <div className="text-muted text-uppercase">Total Mobil</div>
                                    <div className="h4 fw-bold">{stats.total_mobil}</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg="4" md="6" className="mb-4">
                        <Card className="border-success border-start border-5 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="me-3 text-success">
                                    <FaCheckCircle size={40} />
                                </div>
                                <div>
                                    <div className="text-muted text-uppercase">Mobil Tersedia</div>
                                    <div className="h4 fw-bold">{stats.mobil_tersedia}</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg="4" md="6" className="mb-4">
                        <Card className="border-warning border-start border-5 shadow-sm h-100">
                            <Card.Body className="d-flex align-items-center">
                                <div className="me-3 text-warning">
                                    <FaCarSide size={40} />
                                </div>
                                <div>
                                    <div className="text-muted text-uppercase">Mobil Disewa</div>
                                    <div className="h4 fw-bold">{stats.mobil_disewa}</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}     
        
        <Row>
            <Col>
                <Card className="mt-3">
                    <Card.Header>
                    <Card.Title>Pengguna Terbaru</Card.Title>
                    </Card.Header>
                    <Card.Body>
                    <Table responsive striped hover>
                        <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>No. Telepon</th>
                            <th>Bergabung Pada</th>
                        </tr>
                        </thead>
                        <tbody>
                        {penggunaTerbaru.length > 0 ? (
                            penggunaTerbaru.map(user => (
                            <tr key={user.id}>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="4" className="text-center text-muted">
                                Belum ada pengguna yang mendaftar.
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
            </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
