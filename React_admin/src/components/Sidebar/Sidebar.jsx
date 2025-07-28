// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activePage, setActivePage, sidebarOpen, toggleSidebar }) => {
  return (
    <>
      <button 
        className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <h2>Мониторинг датчиков</h2>
        </div>
        
        <div className="nav-menu">
          <div 
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Дашборд</span>
          </div>
          <div 
            className={`nav-item ${activePage === 'history' ? 'active' : ''}`}
            onClick={() => setActivePage('history')}
          >
            <i className="fas fa-history"></i>
            <span>История показаний</span>
          </div>
          <div 
            className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}
            onClick={() => setActivePage('reports')}
          >
            <i className="fas fa-chart-bar"></i>
            <span>Отчеты</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-cog"></i>
            <span>Настройки датчиков</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-users"></i>
            <span>Пользователи</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-question-circle"></i>
            <span>Помощь</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;