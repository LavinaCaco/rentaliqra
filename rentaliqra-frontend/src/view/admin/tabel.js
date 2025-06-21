import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup, Alert, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Tabel = () => {
    const [mobils, setMobils] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [editingMobil, setEditingMobil] = useState(null); 

    const API_URL = 'http://127.0.0.1:8000';

    const fetchMobils = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/mobil`);
            setMobils(response.data);
        } catch (error) {
            console.error("Gagal mengambil data mobil:", error);
            setNotification({ show: true, message: 'Gagal mengambil data dari server.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMobils();
    }, []);

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
        seat: yup.number().required("Jumlah seat wajib diisi").positive().integer(),
        harga: yup.number().required("Harga wajib diisi").positive(),
        keterangan: yup.string().nullable(),
        foto: yup.mixed().when('editing', {
            is: false, 
            then: (schema) => schema.required('Foto wajib diunggah'),
            otherwise: (schema) => schema.nullable(),
        }),
    });

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'foto') {
                if (value) { 
                    formData.append(key, value);
                }
            } else {
                formData.append(key, value || '');
            }
        });

        const isEditing = !!editingMobil;
        const url = isEditing ? `${API_URL}/api/mobil/${editingMobil.id}` : `${API_URL}/api/mobil`;
        
        if(isEditing) formData.append('_method', 'PUT'); 

        try {
            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            setNotification({ show: true, message: response.data.message, type: 'success' });

            if (isEditing) {
                setMobils(mobils.map(m => m.id === editingMobil.id ? response.data.data : m));
            } else {
                setMobils(currentMobils => [response.data.data, ...currentMobils]);
            }
            
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
                await axios.delete(`${API_URL}/api/mobil/${id}`);
                setNotification({ show: true, message: 'Data berhasil dihapus!', type: 'success' });
                setMobils(mobils.filter(mobil => mobil.id !== id));
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                setNotification({ show: true, message: 'Gagal menghapus data.', type: 'danger' });
            }
        }
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
                                        <th>Seat</th>
                                        <th>Harga</th>
                                        <th>Keterangan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? ( <tr><td colSpan="7" className="text-center">Loading...</td></tr>
                                    ) : mobils.length > 0 ? (
                                        mobils.map((mobil, index) => (
                                            <tr key={mobil.id}>
                                                <td>{index + 1}</td>
                                                <td>{mobil.foto && (<img src={`${API_URL}/storage/mobil/${mobil.foto}`} alt={mobil.merek} style={{ width: '100px', height: 'auto', borderRadius: '4px' }}/>)}</td>
                                                <td>{mobil.merek}</td><td>{mobil.seat}</td>
                                                <td>Rp {new Intl.NumberFormat('id-ID').format(mobil.harga)}</td>
                                                <td>{mobil.keterangan || '-'}</td>
                                                <td>
                                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleShowEditModal(mobil)}>Edit</Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(mobil.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : ( <tr><td colSpan="7" className="text-center">Belum ada data.</td></tr> )}
                                </tbody>
                            </Table>
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
                        ? { ...editingMobil, foto: null } 
                        : { merek: '', seat: '', harga: '', keterangan: '', foto: null }
                    }
                    enableReinitialize
                >
                    {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingMobil ? 'Edit Data Mobil' : 'Tambah Data Mobil'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Col} md="12" controlId="validationFormikMerek" className="mb-3">
                                    <Form.Label>Merek Mobil</Form.Label>
                                    <Form.Control type="text" name="merek" value={values.merek} onChange={handleChange} isInvalid={!!errors.merek}/>
                                    <Form.Control.Feedback type="invalid">{errors.merek}</Form.Control.Feedback>
                                </Form.Group>
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
                                <Form.Group controlId="validationFormikFoto" className="mb-3">
                                    <Form.Label>Foto</Form.Label>
                                    <Form.Control type="file" name="foto" onChange={(event) => setFieldValue("foto", event.currentTarget.files[0])} isInvalid={!!errors.foto}/>
                                    {editingMobil && editingMobil.foto && !values.foto && (
                                        <Form.Text muted>
                                            File saat ini: {editingMobil.foto}. Kosongkan jika tidak ingin ganti.
                                        </Form.Text>
                                    )}
                                    <Form.Control.Feedback type="invalid">{errors.foto}</Form.Control.Feedback>
                                </Form.Group>
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