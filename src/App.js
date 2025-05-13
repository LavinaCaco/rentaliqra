import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './view/home';
import Mobil from './view/mobil';
import ScrollToTop from './components/ScrollToTop'; 

export default function App() {
  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobil" element={<Mobil />} />
      </Routes>
    </>
  );
}
