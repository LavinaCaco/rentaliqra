import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './view/home';

import ScrollToTop from './components/ScrollToTop'; 

export default function App() {
  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  );
}
