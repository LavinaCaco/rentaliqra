import React from "react";
import {   Container,
  Row,
  Col,
  Button,
  InputGroup,
  Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCar,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function SearchSection() {
    const navigate = useNavigate();
  return (
<div>
        <Container>
          <Row className="justify-content-center" id="info">
            <Col md={10} lg={8}>

              <div
                className="bg-white rounded shadow p-3"
                style={{ color: "#333" }}
              >
                <div className="d-flex mb-3">
                  <Button variant="light" className="me-2 active">
                    Sewa
                  </Button>
                  <Button variant="light">Tour</Button>
                </div>

                <Row className="g-2 align-items-center">
                  <Col md>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaCar />
                      </InputGroup.Text>
                      <Form.Select>
                        <option>Tipe mobil</option>
                        <option>MPV</option>
                        <option>SUV</option>
                        <option>City Car</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>

                  <Col md>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaMoneyBillWave />
                      </InputGroup.Text>
                      <Form.Select>
                        <option>Range Harga Sewa</option>
                        <option>&lt; Rp 300.000</option>
                        <option>Rp 300.000 - 500.000</option>
                        <option>&gt; Rp 500.000</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>

                  <Col md>
                    <Form.Control
                      type="text"
                      placeholder="Cari Berdasarkan Lokasi Anda"
                    />
                  </Col>

                  <Col md="auto">
                    <Button
                      onClick={() => navigate("/mobil")}
                      variant="dark"
                      className="w-100 px-4"
                    >
                      Cari
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
}