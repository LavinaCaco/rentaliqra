import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./view/home";
import Mobil from "./view/mobil";
import Sewa from "./view/sewa";
import Login from "./view/login";
import Register from "./view/register";
import Users from './view/admin/users'; 
import Ulasan from './view/ulasan';

import AdminLayout from "./layouts/AdminLayout"; 
import Dashboard from "./view/admin/dashboard";
import Tabel from "./view/admin/tabel";
import ManajemenSewa from './view/admin/manajemensewa';

import RiwayatPesanan from './view/riwayatpesanan';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import { Table } from "react-bootstrap";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobil" element={<Mobil />} />
        <Route path="/ulasan" element={<Ulasan />} />
        <Route path="/sewa/:id" element={<Sewa />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        
        <Route 
          path="/sewa/:id"
          element={
            <ProtectedRoute>
              <Sewa />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/pesanan" 
          element={
            <ProtectedRoute>
              <RiwayatPesanan />
            </ProtectedRoute>
          } 
        />

        <Route path="/admin" element={<AdminLayout />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tabel" element={<Tabel />} />
          <Route path="sewa" element={<ManajemenSewa />} />

          
          <Route index element={<Navigate to="dashboard" replace />} />

        </Route>
      </Routes>
    </>
  );
}