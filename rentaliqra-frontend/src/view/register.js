import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

import api from "../utils/axios";

import FooterSection from "../components/FooterSection";
import WhatsAppFAB from "../components/WhatsAppFAB";
const NavbarSection = lazy(() => import("../components/NavbarSection"));
// import axios from "axios";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);


    try {
      const response = await api.post("/register", form);
      setMessage({ type: "success", text: "Registrasi berhasil!" });
      navigate("/login");
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
      })
    } catch (error) {
      const msg = error.response?.data?.message || "Registrasi gagal, harap ulang kembali!.";
      setMessage({ type: "danger", text: msg });
    }
  };

  return (
    <div style={{ fontFamily: "Poppins" }}>
        <NavbarSection />

        <Container style={{ maxWidth: 480, marginTop: 80 }} className="mb-5">
        <h2 className="mb-4 text-center">Daftar Akun</h2>

        {message && <Alert variant={message.type}>{message.text}</Alert>}

        {!message &&<Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
            <Form.Label>Nama Depan</Form.Label>
            <Form.Control
                type="text"
                name="first_name"
                required
                onChange={handleChange}
            />
            </Form.Group>
             <Form.Group className="mb-3">
            <Form.Label>Nama Belakang</Form.Label>
            <Form.Control
                type="text"
                name="last_name"
                required
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                name="email"
                required
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Telepon</Form.Label>
            <Form.Control
                type="phone"
                name="phone"
                required
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                name="password"
                required
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group className="mb-4">
            <Form.Label>Konfirmasi Password</Form.Label>
            <Form.Control
                type="password"
                name="password_confirmation"
                required
                onChange={handleChange}
            />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
            Daftar
            </Button>
        </Form>}
        </Container>
        
        <WhatsAppFAB />

        <FooterSection />
    </div>
  );
}
