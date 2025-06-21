import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TopNavbar = () => {
    const navigate = useNavigate(); 
    const API_URL = 'http://127.0.0.1:8000';

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.post(`${API_URL}/api/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Logout berhasil di server.');
        } catch (error) {
            console.error('Error saat logout di server:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            navigate('/');
        }
    };


    return (
        <Navbar bg="transparent" expand="lg" className="navbar-absolute">
            <Container fluid>
                <Navbar.Brand href="#" className="fw-bold">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#account">Account</Nav.Link>
                        <Nav.Link as="button" onClick={handleLogout} className="btn btn-link nav-link">
                            Log out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNavbar;