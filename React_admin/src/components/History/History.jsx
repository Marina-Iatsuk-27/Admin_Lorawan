// src/components/History/History.jsx
import React, { useState } from 'react';
import './History.css';

const History = () => {
  const [activeFilter, setActiveFilter] = useState('all');
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

  const historyData = [
    { id: 1, date: '17.07.2023 12:30', sensor: 'Давление', location: 'Котельная 3', value: '4.2 Бар', status: 'danger', comment: 'Превышение допустимого давления' },
    { id: 2, date: '17.07.2023 11:45', sensor: 'Электричество', location: 'Корпус B', value: '245 В', status: 'warning', comment: 'Скачок напряжения' },
    { id: 3, date: '17.07.2023 10:20', sensor: 'Вода', location: 'Этаж 2', value: '15 л/мин', status: 'danger', comment: 'Обнаружена утечка' },
    { id: 4, date: '17.07.2023 09:15', sensor: 'Температура', location: 'Серверная', value: '22°C', status: 'normal', comment: '' },
    { id: 5, date: '17.07.2023 08:30', sensor: 'Газ', location: 'Котельная 1', value: '0.8 м³/ч', status: 'normal', comment: 'Плановое обслуживание' },
    { id: 6, date: '16.07.2023 18:45', sensor: 'Температура', location: 'Цех 4', value: '28°C', status: 'warning', comment: 'Кондиционер отключен' },
    { id: 7, date: '16.07.2023 15:20', sensor: 'Электричество', location: 'Корпус A', value: '42 кВт', status: 'normal', comment: '' },
    { id: 8, date: '16.07.2023 12:10', sensor: 'Вода', location: 'Этаж 1', value: '2.5 л/мин', status: 'normal', comment: '' },
  ];

  const filteredData = historyData.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return item.status === 'danger';
    if (activeFilter === 'warning') return item.status === 'warning';
    return true;
  });

  return (
    <div className="history-page">
      {/* Верхняя панель */}
      <div className="top-bar">
        <div className="date-time">{formatDate(currentTime)}</div>
        <div className="notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </div>
      </div>

      {/* Управление историей */}
      <div className="history-controls">
        <div className="control-row">
          <div className="date-range">
            <span>Период:</span>
            <input type="date" defaultValue="2023-07-10" />
            <span>-</span>
            <input type="date" defaultValue="2023-07-17" />
          </div>

          <div className="sensor-selector">
            <span>Датчик:</span>
            <select>
              <option>Все датчики</option>
              <option>Температура</option>
              <option>Электричество</option>
              <option>Газ</option>
              <option>Вода</option>
              <option>Давление</option>
            </select>
          </div>

          <button className="export-btn">
            <i className="fas fa-file-export"></i>
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      {/* Фильтры */}
      <div className="filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <i className="fas fa-list"></i>
          <span>Все показания</span>
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'critical' ? 'active' : ''}`}
          onClick={() => setActiveFilter('critical')}
        >
          <i className="fas fa-exclamation-triangle"></i>
          <span>Только критические</span>
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'warning' ? 'active' : ''}`}
          onClick={() => setActiveFilter('warning')}
        >
          <i className="fas fa-bell"></i>
          <span>Превышение нормы</span>
        </button>
        <button className="filter-btn">
          <i className="fas fa-building"></i>
          <span>Корпус A</span>
        </button>
        <button className="filter-btn">
          <i className="fas fa-building"></i>
          <span>Корпус B</span>
        </button>
      </div>

      {/* Таблица истории */}
      <div className="table-container">
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Дата и время</th>
                <th>Датчик</th>
                <th>Помещение</th>
                <th>Значение</th>
                <th>Статус</th>
                <th>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.sensor}</td>
                  <td>{item.location}</td>
                  <td>{item.value}</td>
                  <td>
                    <span className={`status-badge status-${item.status}`}>
                      {item.status === 'danger' ? 'Критическое' : 
                       item.status === 'warning' ? 'Превышение' : 'Норма'}
                    </span>
                  </td>
                  <td>{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Пагинация */}
      <div className="pagination">
        <div className="page-info">
          Показано 1-8 из {filteredData.length} записей
        </div>
        <div className="page-controls">
          <button className="page-btn">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <button className="page-btn">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;