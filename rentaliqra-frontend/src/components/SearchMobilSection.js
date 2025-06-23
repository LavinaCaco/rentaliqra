import React from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const SearchMobilSection = ({
    filterTipe,
    setFilterTipe,
    filterHarga,
    setFilterHarga,
    handleSearch
}) => {
    return (
        <Container className="my-5">
            <Card className="p-4 shadow-lg border-0">
                <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <Row className="g-3 align-items-end">
                        <Col lg={5} md={6}>
                            <Form.Label>Tipe mobil</Form.Label>
                            <Form.Select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)}>
                                <option value="">Semua Tipe</option>
                                <option value="SUV">SUV</option>
                                <option value="MPV">MPV</option>
                                <option value="City Car">City Car</option>
                            </Form.Select>
                        </Col>
                        <Col lg={5} md={6}>
                            <Form.Label>Range Harga Sewa</Form.Label>
                            <Form.Select value={filterHarga} onChange={(e) => setFilterHarga(e.target.value)}>
                                <option value="">Semua Harga</option>
                                <option value="<300k">&lt; Rp 300.000</option>
                                <option value="300k-500k">Rp 300.000 - Rp 500.000</option>
                                <option value=">500k">&gt; Rp 500.000</option>
                            </Form.Select>
                        </Col>
                        <Col lg={2} md={12} className="d-grid">
                            <Button variant="dark" type="submit">Cari</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default SearchMobilSection;