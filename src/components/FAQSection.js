import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";

export default function FAQAndTermsSection() {
  return (
    <div className="py-5 bg-white" id="info">
      <Container>
        <Row>
          {/* Kolom Kiri - Syarat & Ketentuan */}
          <Col md={6}>
            <h3 className="fw-bold mb-4">Syarat & Ketentuan Sewa Mobil</h3>
            <p className="text-muted">
              Syarat dan ketentuan dapat bervariasi antara penyedia sewa mobil
              yang ada di Palu. Pastikan untuk membaca dan memahami dengan baik
              perjanjian penyewaan sebelum Anda memutuskan untuk menyewa mobil
              di kami. Dengan menyewa mobil di kami, itu berarti kami anggap
              Anda telah membaca, memahami dengan baik, menyetujui serta
              bersedia mematuhi syarat dan ketentuan yang berlaku di Top Sewa
              Mobil Palu, seperti dibawah ini:
            </p>

            <h6 className="fw-bold mt-4">
              Syarat dan ketentuan Sewa Mobil Lepas Kunci
            </h6>
            <ol className="text-muted small">
              <li>Mengirim foto E-KTP melalui WhatsApp.</li>
              <li>Mengirim foto SIM yang masih berlaku melalui WhatsApp.</li>
              <li>
                Menginformasikan data diri lainnya, akan kami info saat
                melakukan pemesanan.
              </li>
              <li>
                Sewa mobil minimal 2 hari. Kelebihan waktu sewa akan dikenakan
                biaya extra time sebesar 10% - 20% per jam dari tarif sewa
                mobil, maksimal extra time adalah 3 jam.
              </li>
              <li>
                Gratis biaya antar dan pengemPaluan mobil jika sewa 4 hari atau
                lebih, di airport, Denpasar, Sanur, Kuta, Legian, Kerobokan,
                Seminyak dan sekitarnya. Jika di luar area tersebut, ada biaya
                tambahan menyesuaikan jarak.
              </li>
              <li>
                Seluruh armada kami diasuransikan. Jika terjadi kerusakan
                ringan-sedang seperti lecet atau penyok, dikenakan klaim
                Rp.350.000/panel. Untuk kerusakan berat seperti ringsek atau
                kaca pecah akan dikenakan biaya perbaikan dan kompensasi (maks.
                10 hari sewa).
              </li>
              <li>Sewa mobil hanya boleh digunakan di wilayah Palu saja.</li>
              <li>
                Tidak diperkenankan menggunakan mobil sewaan untuk balapan,
                segala bentuk kejahatan, atau aktivitas berisiko tinggi.
              </li>
            </ol>

            <h6 className="fw-bold mt-4">
              Syarat dan ketentuan Sewa Mobil Dengan Sopir
            </h6>
            <ol className="text-muted small">
              <li>Harga sudah termasuk mobil, sopir, dan bensin.</li>
              <li>Durasi pemakaian 10 jam.</li>
              <li>Maksimal pemakaian sampai jam 24.00.</li>
            </ol>
          </Col>

          {/* Kolom Kanan - FAQ */}
          <Col md={6}>
            <h3 className="fw-bold mb-4">Frequently Asked Question</h3>
            <Accordion defaultActiveKey="0" flush>
              {[
                { q: "Bisakah sewa mobil lepas kunci?", a: "Bisa" },
                {
                  q: "Mobil apa saja yang tersedia?",
                  a: "Tersedia city car, MPV seperti Brio, Avanza, Xpander, dll.",
                },
                {
                  q: "Apa syarat sewa mobil lepas kunci?",
                  a: "Mengirim KTP & SIM aktif melalui WhatsApp.",
                },
                {
                  q: "Apakah mobil bisa serah terima di airport atau hotel?",
                  a: "Bisa, sesuai lokasi yang disepakati.",
                },
                {
                  q: "Apakah mobil bisa dibawa ke luar Palu?",
                  a: "Tidak, hanya untuk wilayah Palu.",
                },
                {
                  q: "Sewa mobil lepas kunci minimal berapa hari?",
                  a: "Minimal 2 hari.",
                },
                {
                  q: "Bagaimana cara booking?",
                  a: "Cukup hubungi kami via WhatsApp atau form booking online.",
                },
                {
                  q: "Bisakah sewa mobil dengan sopir?",
                  a: "Bisa. Tersedia opsi dengan sopir & BBM.",
                },
                {
                  q: "Berapa lama durasi sewa mobil dengan sopir?",
                  a: "10 jam per hari, maksimal hingga pukul 24.00.",
                },
                {
                  q: "Apakah sewa mobil dengan sopir sudah termasuk bahan bakar?",
                  a: "Ya, sudah termasuk.",
                },
              ].map((item, i) => (
                <Accordion.Item eventKey={i.toString()} key={i}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body className="text-muted small">
                    {item.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
