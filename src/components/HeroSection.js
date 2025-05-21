import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function HeroSection() {
  const videoUrl = "/assets/bghome.webm";

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay gelap */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Konten tengah */}
      <Container style={{ position: "relative", zIndex: 2, color: "#fff" }}>
        <Row className="justify-content-center">
          <Col lg={10}>
            <small className="text-uppercase">IQRA RENTAL MOBIL PALU</small>
            <h1 className="display-4 fw-bold">Rental Mobil PALU</h1>
            <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
              Selamat datang di IQRA Rental Mobil Palu, hadir untuk menjawab
              kebutuhan mobilitas Anda dengan layanan rental mobil premium yang
              siap antar jemput kapan saja, ke mana saja, tanpa ribet dan penuh
              kepastian!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
