import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Table, Spinner, Alert, Badge, Pagination, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import api from '../../utils/axios';
import appPath from '../../utils/path';
import { FaCheck } from 'react-icons/fa';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale'; 

const ManajemenSewa = () => {
    const [sewaList, setSewaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 8; 

    const token = localStorage.getItem('token');

    const fetchSewa = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/sewa`, {
                params: {
                    page: currentPage,
                    per_page: itemsPerPage
                },
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setSewaList(response.data.data);
                setCurrentPage(response.data.current_page || 1);
                setLastPage(response.data.last_page || 1);
                setTotalItems(response.data.total || 0);
            } else {
                console.error("Struktur respons API sewa tidak sesuai:", response.data);
                setSewaList([]);
                setNotification({ show: true, message: 'Gagal memuat data penyewaan dari server. Format data tidak sesuai.', type: 'danger' });
            }
        } catch (error) {
            console.error("Gagal mengambil data sewa:", error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 401) {
                setNotification({ show: true, message: 'Sesi Anda telah berakhir. Silakan login kembali.', type: 'warning' });
            } else {
                setNotification({ show: true, message: 'Gagal mengambil data penyewaan.', type: 'danger' });
            }
            setSewaList([]);
        } finally {
            setLoading(false);
        }
    }, [appPath.APP_URL, currentPage, itemsPerPage, token]);

    useEffect(() => {
        fetchSewa();
    }, [fetchSewa]);

    const handleUpdateStatus = async (sewaId, newStatus) => {
        if (!window.confirm(`Apakah Anda yakin ingin mengubah status sewa ini menjadi '${newStatus}'?`)) {
            return;
        }
        try {
            setLoading(true); 
            const response = await api.put(`/sewa/${sewaId}/status`,
                { status: newStatus },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            setNotification({ show: true, message: response.data.message, type: 'success' });
            fetchSewa();
        } catch (error) {
            console.error("Gagal memperbarui status sewa:", error.response ? error.response.data : error.message);
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui status sewa.';
            setNotification({ show: true, message: errorMessage, type: 'danger' });
        } finally {
            setLoading(false);
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
                                    <th>No</th>
                                    <th>ID Sewa</th>
                                    <th>Penyewa</th>
                                    <th>Mobil</th>
                                    <th>Tanggal Sewa</th>
                                    <th>Tanggal Kembali</th>
                                    <th>Total Harga</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sewaList.length > 0 ? (
                                    sewaList.map((sewa, index) => {
                                        const tglSewa = new Date(sewa.tanggal_sewa);
                                        const isTglSewaValid = isValid(tglSewa);

                                        const tglKembali = sewa.tanggal_kembali ? new Date(sewa.tanggal_kembali) : null;
                                        const isTglKembaliValid = tglKembali ? isValid(tglKembali) : false;

                                        let displayStatus = sewa.status;
                                        let badgeBg = 'secondary';

                                        switch (sewa.status) {
                                            case 'pending':
                                                badgeBg = 'warning';
                                                displayStatus = 'Pending';
                                                break;
                                            case 'approved':
                                                badgeBg = 'primary';
                                                displayStatus = 'Disetujui';
                                                break;
                                            case 'completed':
                                                badgeBg = 'success';
                                                displayStatus = 'Selesai';
                                                break;
                                            case 'cancelled':
                                                badgeBg = 'danger';
                                                displayStatus = 'Dibatalkan';
                                                break;
                                            case 'disewa':
                                                badgeBg = 'primary';
                                                displayStatus = 'Disewa';
                                                break;
                                            case 'selesai':
                                                badgeBg = 'success';
                                                displayStatus = 'Selesai';
                                                break;
                                            default:
                                                badgeBg = 'secondary';
                                                displayStatus = sewa.status;
                                        }


                                        return (
                                            <tr key={sewa.id}>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td>{sewa.id}</td>
                                                <td>{sewa.user ? `${sewa.user.first_name} ${sewa.user.last_name}` : 'N/A'}</td>
                                                <td>{sewa.mobil ? `${sewa.mobil.merek} (${sewa.mobil.tipe})` : 'N/A'}</td>
                                                <td>{isTglSewaValid ? format(tglSewa, 'dd MMMM yyyy', { locale: id }) : 'Invalid Date'}</td>
                                                <td>{isTglKembaliValid ? format(tglKembali, 'dd MMMM yyyy', { locale: id }) : '-'}</td>
                                                <td>Rp {new Intl.NumberFormat('id-ID').format(sewa.total_harga || 0)}</td>
                                                <td>
                                                    <Badge bg={badgeBg} className="text-capitalize">
                                                        {displayStatus}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="secondary" size="sm" id={`dropdown-status-${sewa.id}`}>
                                                            Aksi
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {sewa.status === 'pending' && (
                                                                <>
                                                                    <Dropdown.Item onClick={() => handleUpdateStatus(sewa.id, 'approved')}>Set Approved</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => handleUpdateStatus(sewa.id, 'cancelled')}>Set Cancelled</Dropdown.Item>
                                                                </>
                                                            )}
                                                            {(sewa.status === 'approved' || sewa.status === 'disewa') && (
                                                                <Dropdown.Item onClick={() => handleUpdateStatus(sewa.id, 'completed')}>Set Completed</Dropdown.Item>
                                                            )}
                                                            {(sewa.status === 'completed' || sewa.status === 'selesai' || sewa.status === 'cancelled') && (
                                                                <Dropdown.Item disabled>Tidak Ada Aksi</Dropdown.Item>
                                                            )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan="9" className="text-center">Belum ada data penyewaan.</td></tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                    {totalItems > itemsPerPage && (
                        <div className="d-flex justify-content-center mt-4">
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
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ManajemenSewa;