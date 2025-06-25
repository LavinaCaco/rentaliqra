import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { BsGrid, BsKey, BsCarFront, BsPeople } from 'react-icons/bs'; 

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin/dashboard', icon: <BsGrid />, name: 'Dashboard' },
    { path: '/admin/tabel', icon: <BsCarFront />, name: 'Manajemen Mobil' },
    { path: '/admin/users', icon: <BsPeople />, name: 'Manajemen User' },
    { path: '/admin/sewa', icon: <BsKey />, name: 'Manajemen Sewa' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="/admin" className="simple-text logo-normal">
          Admin Panel
        </a>
      </div>
      <Nav as="ul" className="flex-column">
        {navItems.map((item, index) => (
          <Nav.Item as="li" key={index} className={location.pathname.startsWith(item.path) ? 'active' : ''}>
            <Nav.Link as={Link} to={item.path}>
              {item.icon}
              <p>{item.name}</p>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;