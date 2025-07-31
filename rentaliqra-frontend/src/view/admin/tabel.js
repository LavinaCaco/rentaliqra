import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Table, Spinner, Badge, Pagination } from 'react-bootstrap'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import api from '../../utils/axios';
import appPath from '../../utils/path';

const Tabel = () => {
    const [mobils, setMobils] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [editingMobil, setEditingMobil] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6; 

    const token = localStorage.getItem('token');

    const fetchMobils = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/mobil`, {
                params: {
                    page: currentPage,
                    per_page: itemsPerPage 
                },
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setMobils(response.data.data);
                setCurrentPage(response.data.current_page || 1);
                setLastPage(response.data.last_page || 1);
                setTotalItems(response.data.total || 0);
            } else {
                console.error("Struktur respons API mobil untuk admin tidak sesuai:", response.data);
                setMobils([]);
                setNotification({ show: true, message: 'Gagal memuat data mobil dari server. Format data tidak sesuai.', type: 'danger' });
            }
        } catch (error) {
            console.error("Gagal mengambil data mobil:", error.response ? error.response.data : error.message);
            setMobils([]); 
            setNotification({ show: true, message: 'Gagal mengambil data mobil dari server.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    }, [appPath.APP_URL, currentPage, itemsPerPage, token]); 

    useEffect(() => {
        fetchMobils();
    }, [fetchMobils]);

    const handleCloseModal = () => {
        setEditingMobil(null);
        setShowModal(false);
    };

    const handleShowAddModal = () => {
        setEditingMobil(null);
        setShowModal(true);
    };

    const handleShowEditModal = (mobil) => {
        setEditingMobil(mobil);
        setShowModal(true);
    };

    const schema = yup.object().shape({
        merek: yup.string().required("Merek wajib diisi"),
        tipe: yup.string().required("Tipe mobil wajib dipilih"),
        seat: yup.number().required("Jumlah seat wajib diisi").positive().integer(),
        harga: yup.number().required("Harga wajib diisi").positive(),
        keterangan: yup.string().nullable(),
        foto_depan: yup.mixed().nullable(),
        foto_belakang: yup.mixed().nullable(),
        foto_samping: yup.mixed().nullable(),
        foto_dalam: yup.mixed().nullable(),
    });

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();

        formData.append('merek', values.merek);
        formData.append('tipe', values.tipe);
        formData.append('seat', values.seat);
        formData.append('harga', values.harga);
        formData.append('keterangan', values.keterangan || '');

        if (values.foto_depan) formData.append('foto_depan', values.foto_depan);
        if (values.foto_belakang) formData.append('foto_belakang', values.foto_belakang);
        if (values.foto_samping) formData.append('foto_samping', values.foto_samping);
        if (values.foto_dalam) formData.append('foto_dalam', values.foto_dalam);

        const isEditing = !!editingMobil;
        const url = isEditing ? `${appPath.APP_URL}/api/mobil/${editingMobil.id}` : `${appPath.APP_URL}/api/mobil`;

        try {
            const response = await axios.post(url, formData, { 
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
            });

            setNotification({ show: true, message: response.data.message, type: 'success' });

            fetchMobils();

            resetForm();
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            setNotification({ show: true, message: 'Gagal memproses data!', type: 'danger' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await api.delete(`/mobil/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setNotification({ show: true, message: 'Data berhasil dihapus!', type: 'success' });
                fetchMobils();
            } catch (error) {
                console.error("Gagal menghapus data:", error.response ? error.response.data : error.message);
                setNotification({ show: true, message: 'Gagal menghapus data.', type: 'danger' });
            }
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
            {notification.show && ( <Alert variant={notification.type} onClose={() => setNotification({ ...notification, show: false })} dismissible className="mt-3">{notification.message}</Alert> )}

            <Row>
                <Col md="12">
                    <Card>
                        <Card.Header><Button variant="primary" onClick={handleShowAddModal}>Add Data Mobil</Button></Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Foto</th>
                                        <th>Merek</th>
                                        <th>Tipe</th>
                                        <th>Status</th>
                                        <th>Seat</th>
                                        <th>Harga</th>
                                        <th>Keterangan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="9" className="text-center"><Spinner animation="border" size="sm" className="me-2"/>Loading...</td></tr>
                                    ) : mobils.length > 0 ? (
                                        mobils.map((mobil, index) => (
                                            <tr key={mobil.id}>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td>
                                                    {mobil.foto_depan && (<img src={`${appPath.APP_URL}/storage/mobil/${mobil.foto_depan}`} alt={mobil.merek} style={{ width: '100px', height: 'auto', borderRadius: '4px' }}/>)}
                                                </td>
                                                <td>{mobil.merek}</td>
                                                <td>{mobil.tipe}</td>
                                                <td>
                                                    <Badge bg={mobil.status === 'ready' ? 'success' : 'warning'} className="text-capitalize">
                                                        {mobil.status}
                                                    </Badge>
                                                </td>
                                                <td>{mobil.seat}</td>
                                                <td>Rp {new Intl.NumberFormat('id-ID').format(mobil.harga)}</td>
                                                <td>{mobil.keterangan || '-'}</td>
                                                <td>
                                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleShowEditModal(mobil)}>Edit</Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(mobil.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="9" className="text-center">Belum ada data.</td></tr>
                                    )}
                                </tbody>
                            </Table>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Formik
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                    initialValues={
                        editingMobil
                        ? { ...editingMobil, tipe: editingMobil.tipe || '', foto_depan: null, foto_belakang: null, foto_samping: null, foto_dalam: null }
                        : { merek: '', tipe: '', seat: '', harga: '', keterangan: '', foto_depan: null, foto_belakang: null, foto_samping: null, foto_dalam: null }
                    }
                    enableReinitialize
                >
                    {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingMobil ? 'Edit Data Mobil' : 'Tambah Data Mobil'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="validationFormikMerek">
                                            <Form.Label>Merek Mobil</Form.Label>
                                            <Form.Control type="text" name="merek" value={values.merek} onChange={handleChange} isInvalid={!!errors.merek}/>
                                            <Form.Control.Feedback type="invalid">{errors.merek}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="validationFormikTipe">
                                            <Form.Label>Tipe Mobil</Form.Label>
                                            <Form.Select name="tipe" value={values.tipe} onChange={handleChange} isInvalid={!!errors.tipe}>
                                                <option value="">Pilih Tipe...</option>
                                                <option value="SUV">SUV</option>
                                                <option value="MPV">MPV</option>
                                                <option value="City Car">City Car</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">{errors.tipe}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormikSeat">
                                        <Form.Label>Jumlah Seat</Form.Label>
                                        <Form.Control type="number" name="seat" value={values.seat} onChange={handleChange} isInvalid={!!errors.seat}/>
                                        <Form.Control.Feedback type="invalid">{errors.seat}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormikHarga">
                                        <Form.Label>Harga</Form.Label>
                                        <Form.Control type="number" name="harga" value={values.harga} onChange={handleChange} isInvalid={!!errors.harga}/>
                                        <Form.Control.Feedback type="invalid">{errors.harga}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="validationFormikKeterangan">
                                    <Form.Label>Keterangan</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="keterangan" value={values.keterangan || ''} onChange={handleChange} isInvalid={!!errors.keterangan}/>
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="validationFormikFotoDepan" className="mb-3">
                                            <Form.Label>Foto Depan</Form.Label>
                                            <Form.Control type="file" name="foto_depan" onChange={(event) => setFieldValue("foto_depan", event.currentTarget.files[0])} />
                                            {editingMobil && editingMobil.foto_depan && <Form.Text muted>File saat ini: {editingMobil.foto_depan}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="validationFormikFotoBelakang" className="mb-3">
                                            <Form.Label>Foto Belakang</Form.Label>
                                            <Form.Control type="file" name="foto_belakang" onChange={(event) => setFieldValue("foto_belakang", event.currentTarget.files[0])} />
                                            {editingMobil && editingMobil.foto_belakang && <Form.Text muted>File saat ini: {editingMobil.foto_belakang}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="validationFormikFotoSamping" className="mb-3">
                                            <Form.Label>Foto Samping</Form.Label>
                                            <Form.Control type="file" name="foto_samping" onChange={(event) => setFieldValue("foto_samping", event.currentTarget.files[0])} />
                                            {editingMobil && editingMobil.foto_samping && <Form.Text muted>File saat ini: {editingMobil.foto_samping}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="validationFormikFotoDalam" className="mb-3">
                                            <Form.Label>Foto Dalam</Form.Label>
                                            <Form.Control type="file" name="foto_dalam" onChange={(event) => setFieldValue("foto_dalam", event.currentTarget.files[0])} />
                                            {editingMobil && editingMobil.foto_dalam && <Form.Text muted>File saat ini: {editingMobil.foto_dalam}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                                <Button type="submit" variant="primary">Save Changes</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
};

export default Tabel;