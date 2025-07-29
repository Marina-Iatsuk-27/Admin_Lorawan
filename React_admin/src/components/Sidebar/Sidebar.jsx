// src/components/Sidebar/Sidebar.jsx
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo.png';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  // Закрываем сайдбар при изменении размера экрана на десктопный
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && !sidebarOpen) {
        toggleSidebar();
      } else if (window.innerWidth <= 768 && sidebarOpen) {
        toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen, toggleSidebar]);

  return (
    <>
      <div className="mobile-header">
        <button 
          className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`} 
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
        <div className="mobile-logo">
          <img className="logo-img" src={logo} alt="Логотип" />
        </div>
      </div>
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <img className="logo-imain-img logo-img" src={logo} alt="Логотип" />
        </div>
        
        <div className="nav-menu">
          <NavLink 
            to="/dashboard"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => window.innerWidth <= 768 && toggleSidebar()}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Дашборд</span>
          </NavLink>
          <NavLink 
            to="/history"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => window.innerWidth <= 768 && toggleSidebar()}
          >
            <i className="fas fa-history"></i>
            <span>История показаний</span>
          </NavLink>
        </div>
      </div>

      {/* Оверлей для закрытия по клику вне меню */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;