import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/Navbar';

import '../assets/css/main.css'; 

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <TopNavbar />
        <div className="content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;