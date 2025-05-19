import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function MapsSection() {
  return (
    <section
      id="lokasi"
      style={{ backgroundColor: "#f8f9fa", padding: "4rem 0" }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Peta */}
          <Col lg={6} className="mb-4 mb-lg-0">
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5754.614347125093!2d110.41302848556319!3d-7.7593866161297536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversitas%20Amikom%20Yogyakarta!5e0!3m2!1sid!2sid!4v1746582534275!5m2!1sid!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Rental IQRA"
              ></iframe>
            </div>
          </Col>

          {/* Keterangan */}
          <Col lg={6}>
            <h2 className="mb-3 fw-bold" style={{ color: "#222" }}>
              Lokasi Kami di Yogyakarta
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#555" }}>
              Kunjungi kami langsung untuk melihat armada dan layanan kami
              secara langsung. Kami berada di pusat kota Yogyakarta, mudah
              diakses dan strategis.
            </p>
            <p style={{ fontSize: "1.1rem", color: "#555" }}>
              Pastikan untuk mengatur jadwal kedatangan Anda terlebih dahulu
              untuk layanan terbaik.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
