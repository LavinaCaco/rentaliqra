import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const carList = [
  {
    name: "Honda Brio",
    image: "/assets/mobil3.webp",
    matic: 275000,
    manual: 250000,
    capacity: 4,
  },
  {
    name: "Toyota Avanza",
    image: "/assets/mobil3.webp",
    matic: 300000,
    manual: 250000,
    capacity: 6,
  },
  {
    name: "Xpander",
    image: "/assets/mobil3.webp",
    matic: 350000,
    manual: 300000,
    capacity: 6,
  },
];

export default function Top5MobilSection() {
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h3 className="fw-bold">TOP 3 MOBIL PILIHAN TERBAIK</h3>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Berikut adalah tiga mobil terpopuler yang paling sering disewa oleh
            pelanggan kami. Cocok untuk berbagai kebutuhan perjalanan Anda di
            Bali, baik sendiri, bersama keluarga, atau rombongan kecil.
          </p>
        </div>

        <Row className="g-4 mb-4">
          {carList.map((car, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 shadow-sm border-0">
                <div className="text-center pt-3">
                  <Card.Img
                    src={car.image}
                    alt={car.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "260px",
                    }}
                  />
                </div>
                <div className="bg-dark text-white px-3 py-2 d-flex justify-content-between align-items-center">
                  <div>
                    <small>Sewa Mobil Lepas Kunci</small>
                    <h5 className="mb-0 fw-bold">{car.name}</h5>
                  </div>
                  <Button size="sm" variant="light" className="fw-bold">
                    Sewa Mobil Ini!
                  </Button>
                </div>
                <Card.Body className="bg-light-subtle">
                  <ul className="list-unstyled mb-0 small">
                    <li className="border-bottom py-2">
                      <strong>Lepas Kunci Matic :</strong> Rp{" "}
                      {car.matic.toLocaleString()} / 24 Jam
                    </li>
                    <li className="border-bottom py-2">
                      <strong>Lepas Kunci Manual :</strong> Rp{" "}
                      {car.manual.toLocaleString()} / 24 Jam
                    </li>
                    <li className="pt-2">
                      <strong>Kapasitas :</strong> {car.capacity} Orang
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center">
          <Button
            href="/mobil"
            variant="dark"
            size="lg"
            className="fw-bold px-4"
          >
            Selengkapnya
          </Button>
        </div>
      </Container>
    </div>
  );
}
