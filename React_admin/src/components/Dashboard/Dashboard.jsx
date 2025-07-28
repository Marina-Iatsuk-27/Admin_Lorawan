// src/components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('temperature');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновление времени каждую минуту
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="dashboard-page">
      {/* Верхняя панель */}
      <div className="top-bar">
        <div className="date-time">{formatDate(currentTime)}</div>
        <div className="notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </div>
      </div>

      {/* Дашборд с метриками */}
      <div className="dashboard-metrics">
        <div className="metric-card temperature">
          <h3>Температура</h3>
          <div className="value">23°C</div>
          <div className="status normal">
            <span className="indicator"></span>
            <span>Норма</span>
          </div>
        </div>
        <div className="metric-card electricity">
          <h3>Электричество</h3>
          <div className="value">45 кВт</div>
          <div className="status warning">
            <span className="indicator"></span>
            <span>Превышение 15%</span>
          </div>
        </div>
        <div className="metric-card gas">
          <h3>Газ</h3>
          <div className="value">12 м³</div>
          <div className="status normal">
            <span className="indicator"></span>
            <span>Норма</span>
          </div>
        </div>
        <div className="metric-card water">
          <h3>Вода</h3>
          <div className="value">5 м³</div>
          <div className="status normal">
            <span className="indicator"></span>
            <span>Норма</span>
          </div>
        </div>
      </div>

      {/* Графики и события */}
      <div className="charts-container">
        <div className="chart-box">
          <div className="chart-header">
            <h3>Графики показаний</h3>
            <select>
              <option>Последние 24 часа</option>
              <option>Последние 7 дней</option>
              <option>Последний месяц</option>
            </select>
          </div>
          <div className="chart-tabs">
            <div 
              className={`tab ${currentTab === 'temperature' ? 'active' : ''}`}
              onClick={() => setCurrentTab('temperature')}
            >
              Температура
            </div>
            <div 
              className={`tab ${currentTab === 'electricity' ? 'active' : ''}`}
              onClick={() => setCurrentTab('electricity')}
            >
              Электричество
            </div>
            <div 
              className={`tab ${currentTab === 'gas' ? 'active' : ''}`}
              onClick={() => setCurrentTab('gas')}
            >
              Газ
            </div>
            <div 
              className={`tab ${currentTab === 'water' ? 'active' : ''}`}
              onClick={() => setCurrentTab('water')}
            >
              Вода
            </div>
          </div>
          <div className="chart-placeholder">
            {`[График ${currentTab} за 24 часа]`}
          </div>
        </div>

        <div className="chart-box">
          <div className="chart-header">
            <h3>Критические события</h3>
          </div>
          <ul className="events-list">
            <li className="event-item event-danger">
              <div className="event-time">12:30</div>
              <div className="event-message">Давление в котле превышено (котельная 3)</div>
            </li>
            <li className="event-item event-warning">
              <div className="event-time">11:45</div>
              <div className="event-message">Скачок напряжения (корпус B)</div>
            </li>
            <li className="event-item event-danger">
              <div className="event-time">10:20</div>
              <div className="event-message">Утечка воды (этаж 2)</div>
            </li>
            <li className="event-item">
              <div className="event-time">09:15</div>
              <div className="event-message">Температура в норме (серверная)</div>
            </li>
            <li className="event-item">
              <div className="event-time">08:30</div>
              <div className="event-message">Плановое обслуживание датчиков</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Карта объекта */}
      <div className="map-container">
        <h3>Карта объекта</h3>
        <div className="map-placeholder">
          [Интерактивная схема объекта]
        </div>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color legend-danger"></span>
            <span>Критические показатели</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-warning"></span>
            <span>Превышение нормы</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-success"></span>
            <span>В норме</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;