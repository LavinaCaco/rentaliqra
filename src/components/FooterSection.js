import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer
      style={{
        
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "white",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      ></div>

      {/* Konten Utama */}
      <Container style={{ position: "relative", zIndex: 2 }} id="tentang">
        <Row className="mb-5">
          {/* Kontak */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Kontak Kami</h5>
            <p>
              <FaMapMarkerAlt className="me-2" /> Jl. Inajadulugasi 123, Sleman,
              Yogyakarta
            </p>
            <p>
              <FaPhone className="me-2" /> (+62) 812-3456-789
            </p>
            <p>
              <FaEnvelope className="me-2" /> rentaliqra@gmail.com
            </p>
          </Col>

          {/* Navigasi Cepat */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Navigasi</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/mobil" className="text-white text-decoration-none">
                  Cari Mobil
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-white text-decoration-none">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#info" className="text-white text-decoration-none">
                  Info
                </a>
              </li>
              <li>
                <a href="#lokasi" className="text-white text-decoration-none">
                  Lokasi
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-white text-decoration-none">
                  Kontak
                </a>
              </li>
            </ul>
          </Col>

          {/* Sosial & Info */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Ikuti Kami</h5>
            <div className="d-flex mb-3">
              <a href="https://www.facebook.com/iqrarent?mibextid=wwXIfr&rdid=a6ZoQJ0GE6x20YZQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AjdUeHyiM%2F%3Fmibextid%3DwwXIfr#" className="text-white me-3 fs-5">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/cv.rentalqra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-white me-3 fs-5">
                <FaInstagram />
              </a>
              <a href="https://x.com/IqraPalu56053" className="text-white me-3 fs-5">
                <FaTwitter />
              </a>
            </div>
            <p className="text-white small">
              Temukan berbagai informasi menarik dan promo eksklusif di media
              sosial kami.
            </p>
          </Col>
        </Row>

        {/* Baris Bawah */}
        <Row>
          <Col className="text-center">
            <hr style={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)" }} />
            <p className="mb-0 small text-white">
              &copy; {new Date().getFullYear()} Rental IQRA. All Rights
              Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
