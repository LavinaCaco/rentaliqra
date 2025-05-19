import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Image,
  Card,
  InputGroup,
  Form,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCar,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCartPlus,
  FaCheckSquare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Top5MobilSection from "../components/Top5MobilSection";
import Layanan from "../components/Layanan";
import SearchSection from "../components/SearchMobilSection";
import MapsSection from "../components/MapsSection";
import FooterSection from "../components/FooterSection";
import FAQSection from "../components/FAQSection";
import NavbarSection from "../components/NavbarSection";
import WhatsAppFAB from "../components/WhatsAppFAB";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "Poppins" }}>

      {/* Navbar */}
      <NavbarSection />
      {/* HERO SECTION */}
      <HeroSection />

      <div
        style={{
          height: "600px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <div className="mx-auto" id="layanan">
            <h1 className="fw-bold text-center">Temukan Mobil Kebutuhanmu. </h1>
            <p className="text-center">
              Temukan mobil yang pas untuk setiap kebutuhanmu harian, mingguan,
              atau perjalanan jauh di IQRA rental. <br />
              Proses mudah, armada siap jalan!
            </p>
          </div>
        </div>

        {/* Search */}
        <SearchSection />
      </div>

      {/*Top5MobilSection*/}
      <Top5MobilSection />

      {/* Layanan */}
      <Layanan />

      {/* Maps */}
      <MapsSection />

      {/* FAQ */}
      <FAQSection />

      <WhatsAppFAB />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
