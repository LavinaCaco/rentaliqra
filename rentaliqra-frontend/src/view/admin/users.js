import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Table, Spinner, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Users = () => {
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null); 

    const API_URL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        if (!token) {
            setNotification({ show: true, message: 'Autentikasi gagal. Silakan login kembali.', type: 'danger' });
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAdmins(response.data.admins);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Gagal mengambil data pengguna:", error);
            setNotification({ show: true, message: 'Gagal mengambil data pengguna. Anda mungkin tidak memiliki akses.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const handleCloseModal = () => {
        setEditingUser(null);
        setShowModal(false);
    };

    const handleShowAddModal = () => {
        setEditingUser(null);
        setShowModal(true);
    };
    
    const handleShowEditModal = (user) => {
        setEditingUser(user);
        setShowModal(true);
    };

    const userSchema = yup.object().shape({
        first_name: yup.string().required("Nama depan wajib diisi"),
        last_name: yup.string().required("Nama belakang wajib diisi"),
        email: yup.string().email("Format email tidak valid").required("Email wajib diisi"),
        phone: yup.string().required("Nomor telepon wajib diisi"),
         password: yup.string().when('isEditing', {
         is: false,
         then: (schema) => schema.min(6, 'Password minimal 6 karakter').required('Password wajib diisi'),
         otherwise: (schema) => schema.nullable(),
        }),
    });

    const handleFormSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        const isEditing = !!editingUser;
        const url = isEditing ? `${API_URL}/api/users/${editingUser.id}` : `${API_URL}/api/users`;
        const method = isEditing ? 'put' : 'post';

        const payload = { ...values };
        if (isEditing && !payload.password) {
            delete payload.password;
        }

        try {
            const response = await axios({ method, url, data: payload, headers: { 'Authorization': `Bearer ${token}` } });
            setNotification({ show: true, message: response.data.message, type: 'success' });
            fetchUsers();
            resetForm();
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting form:', error.response);
            const errorMessage = error.response?.data?.message || 'Gagal memproses data!';
            setStatus({ error: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                await axios.delete(`${API_URL}/api/users/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setNotification({ show: true, message: 'Pengguna berhasil dihapus!', type: 'success' });
                fetchUsers(); 
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Gagal menghapus pengguna.';
                setNotification({ show: true, message: errorMessage, type: 'danger' });
            }
        }
    };

    const UserTable = ({ data, userType, onEdit, onDelete }) => (
        <Table striped bordered hover responsive>
            <thead>
                <tr><th>#</th><th>Nama Depan</th><th>Nama Belakang</th><th>Email</th><th>Aksi</th></tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(user)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))
                ) : ( <tr><td colSpan="5" className="text-center">Belum ada data {userType}.</td></tr> )}
            </tbody>
        </Table>
    );

    return (
        <Container fluid>
            {notification.show && (
                <Alert variant={notification.type} onClose={() => setNotification({ ...notification, show: false })} dismissible>
                    {notification.message}
                </Alert>
            )}

            <Card>
                <Card.Header><Card.Title as="h4">Manajemen Pengguna</Card.Title></Card.Header>
                <Card.Body>
                    {loading ? (<div className="text-center"><Spinner animation="border" /></div>) : (
                        <Tabs defaultActiveKey="admins" id="user-management-tabs" className="mb-3">
                            <Tab eventKey="admins" title={`Admin (${admins.length})`}>
                                <div className="d-flex justify-content-end mb-3">
                                     <Button variant="primary" onClick={handleShowAddModal}>+ Tambah Admin</Button>
                                </div>
                                <UserTable data={admins} userType="Admin" onEdit={handleShowEditModal} onDelete={handleDelete} />
                            </Tab>
                            <Tab eventKey="users" title={`User (${users.length})`}>
                                <UserTable data={users} userType="User" onEdit={handleShowEditModal} onDelete={handleDelete} />
                            </Tab>
                        </Tabs>
                    )}
                </Card.Body>
            </Card>
            
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Formik
                    validationSchema={userSchema}
                    onSubmit={handleFormSubmit}
                    initialValues={
                        editingUser 
                        ? { first_name: editingUser.first_name, last_name: editingUser.last_name, email: editingUser.email, phone: editingUser.phone || '', password: '', isEditing: true } 
                        : { first_name: '', last_name: '', email: '', phone: '', password: '', isEditing: false  }
                    }
                    enableReinitialize
                >
                    {({ handleSubmit, handleChange, values, touched, errors, status }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editingUser ? 'Edit Pengguna' : 'Tambah Admin Baru'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {status && status.error && <Alert variant="danger">{status.error}</Alert>}
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>Nama Depan</Form.Label>
                                    <Form.Control type="text" name="first_name" value={values.first_name} onChange={handleChange} isInvalid={touched.first_name && !!errors.first_name}/>
                                    <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Nama Belakang</Form.Label>
                                    <Form.Control type="text" name="last_name" value={values.last_name} onChange={handleChange} isInvalid={touched.last_name && !!errors.last_name}/>
                                    <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={values.email} onChange={handleChange} isInvalid={touched.email && !!errors.email}/>
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Nomor Telepon</Form.Label>
                                    <Form.Control type="text" name="phone" value={values.phone} onChange={handleChange} isInvalid={touched.phone && !!errors.phone}/>
                                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={values.password} onChange={handleChange} isInvalid={touched.password && !!errors.password}/>
                                    {editingUser && <Form.Text muted>Kosongkan jika tidak ingin mengubah password.</Form.Text>}
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                                <Button type="submit" variant="primary">Simpan</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
};

const UserTable = ({ data, userType, onEdit, onDelete }) => (
    <Table striped bordered hover responsive>
        <thead>
            <tr><th>#</th><th>Nama Depan</th><th>Nama Belakang</th><th>Email</th><th>Aksi</th></tr>
        </thead>
        <tbody>
            {data.length > 0 ? (
                data.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(user)}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>Delete</Button>
                        </td>
                    </tr>
                ))
            ) : ( <tr><td colSpan="5" className="text-center">Belum ada data {userType}.</td></tr> )}
        </tbody>
    </Table>
);

export default Users;