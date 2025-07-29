// src/App.js
import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

// Ленивая загрузка компонентов
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const History = lazy(() => import('./components/History/History'));


const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar 
        currentPath={location.pathname}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`main-content ${sidebarOpen ? '' : 'collapsed'}`}>
        <Suspense fallback={<div className="loading-spinner">Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;