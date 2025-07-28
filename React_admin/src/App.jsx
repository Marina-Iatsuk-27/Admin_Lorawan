// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import History from './components/History/History';
import Reports from './components/Reports/Reports';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'history':
        return <History />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`main-content ${sidebarOpen ? '' : 'collapsed'}`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;