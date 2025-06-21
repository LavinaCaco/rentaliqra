import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./view/home";
import Mobil from "./view/mobil";
import Sewa from "./view/sewa";
import Login from "./view/login";
import Register from "./view/register";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobil" element={<Mobil />} />
        <Route path="/sewa" element={<Sewa />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
