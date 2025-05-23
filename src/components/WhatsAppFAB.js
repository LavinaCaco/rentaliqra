import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFAB() {
  const phoneNumber = "6281341017966";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999,
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        textDecoration: "none",
      }}
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
