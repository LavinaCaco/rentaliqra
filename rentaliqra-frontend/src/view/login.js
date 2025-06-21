import React, { useState, lazy } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import api from "../utils/axios"; 
import FooterSection from "../components/FooterSection";
import WhatsAppFAB from "../components/WhatsAppFAB";
const NavbarSection = lazy(() => import("../components/NavbarSection"));

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await api.post("/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage({ type: "success", text: "Login berhasil!" });
      navigate("/");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login gagal, periksa email/password.";
      setMessage({ type: "danger", text: msg });
    }
  };

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <NavbarSection />

      <Container style={{ maxWidth: 480, marginTop: 80 }} className="mb-5">
        <h2 className="mb-4 text-center">Masuk Akun</h2>

        {message && <Alert variant={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>

          <div className="text-center mt-3">
            <span>Belum punya akun? </span>
            <a href="#" onClick={() => navigate("/register")}>
              Daftar di sini
            </a>
          </div>
        </Form>
      </Container>

      <WhatsAppFAB />
      <FooterSection />
    </div>
  );
}
