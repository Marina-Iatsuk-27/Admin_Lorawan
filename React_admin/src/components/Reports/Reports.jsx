// src/components/Reports/Reports.jsx
import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    start: '2023-07-01',
    end: '2023-07-31'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const reportTypes = [
    { id: 'daily', name: 'Ежедневный', icon: 'calendar-day' },
    { id: 'weekly', name: 'Еженедельный', icon: 'calendar-week' },
    { id: 'monthly', name: 'Ежемесячный', icon: 'calendar-alt' },
    { id: 'custom', name: 'Произвольный', icon: 'calendar' },
    { id: 'anomalies', name: 'Аномалии', icon: 'exclamation-triangle' },
    { id: 'consumption', name: 'Потребление', icon: 'chart-line' }
  ];

  const generateReport = () => {
    setIsGenerating(true);
    
    // Имитация загрузки отчета
    setTimeout(() => {
      const mockReport = {
        id: Date.now(),
        type: reportType,
        dateRange,
        createdAt: new Date().toISOString(),
        data: generateMockData(reportType)
      };
      
      setGeneratedReport(mockReport);
      setIsGenerating(false);
    }, 1500);
  };

  const generateMockData = (type) => {
    // Генерация тестовых данных в зависимости от типа отчета
    const data = {
      title: `Отчет ${reportTypes.find(r => r.id === type).name.toLowerCase()}`,
      metrics: {}
    };

    // Добавляем метрики в зависимости от типа отчета
    if (type === 'anomalies') {
      data.metrics = {
        criticalCount: Math.floor(Math.random() * 10),
        warningsCount: Math.floor(Math.random() * 20),
        devicesWithIssues: Math.floor(Math.random() * 5)
      };
    } else {
      data.metrics = {
        temperature: {
          avg: (20 + Math.random() * 10).toFixed(1),
          min: (18 + Math.random() * 2).toFixed(1),
          max: (25 + Math.random() * 5).toFixed(1)
        },
        electricity: {
          total: (100 + Math.random() * 200).toFixed(1),
          avgDaily: (5 + Math.random() * 10).toFixed(1),
          peak: (15 + Math.random() * 20).toFixed(1)
        },
        water: {
          total: (50 + Math.random() * 100).toFixed(1),
          avgDaily: (2 + Math.random() * 5).toFixed(1)
        },
        gas: {
          total: (30 + Math.random() * 70).toFixed(1),
          avgDaily: (1 + Math.random() * 3).toFixed(1)
        }
      };
    }

    return data;
  };

  const downloadReport = (format) => {
    alert(`Отчет будет скачан в формате ${format.toUpperCase()}`);
    // В реальном приложении здесь будет логика скачивания
  };

  return (
    <div className="reports-page">
      {/* Верхняя панель */}
      <div className="top-bar">
        <h2>Генерация отчетов</h2>
        <div className="notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">2</span>
        </div>
      </div>

      {/* Основной контент */}
      <div className="reports-container">
        {/* Панель выбора типа отчета */}
        <div className="report-selection">
          <div className="report-types">
            {reportTypes.map(type => (
              <div 
                key={type.id}
                className={`report-type-card ${reportType === type.id ? 'active' : ''}`}
                onClick={() => setReportType(type.id)}
              >
                <i className={`fas fa-${type.icon}`}></i>
                <span>{type.name}</span>
              </div>
            ))}
          </div>

          {/* Выбор периода */}
          <div className="date-selection">
            <h3>Период отчета</h3>
            <div className="date-inputs">
              <div className="input-group">
                <label>Начальная дата</label>
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Конечная дата</label>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>
            
            <button 
              className="generate-btn"
              onClick={generateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Генерация...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-file-alt"></i>
                  <span>Сформировать отчет</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Результаты отчета */}
        {generatedReport && (
          <div className="report-results">
            <div className="report-header">
              <h3>{generatedReport.data.title}</h3>
              <div className="report-meta">
                <span>Период: {new Date(generatedReport.dateRange.start).toLocaleDateString()} - {new Date(generatedReport.dateRange.end).toLocaleDateString()}</span>
                <span>Сформирован: {new Date(generatedReport.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Визуализация отчета */}
            <div className="report-visualization">
              {reportType === 'anomalies' ? (
                <div className="anomalies-report">
                  <div className="metric-card danger">
                    <h4>Критические события</h4>
                    <div className="metric-value">{generatedReport.data.metrics.criticalCount}</div>
                  </div>
                  <div className="metric-card warning">
                    <h4>Предупреждения</h4>
                    <div className="metric-value">{generatedReport.data.metrics.warningsCount}</div>
                  </div>
                  <div className="metric-card info">
                    <h4>Устройств с проблемами</h4>
                    <div className="metric-value">{generatedReport.data.metrics.devicesWithIssues}</div>
                  </div>
                </div>
              ) : (
                <div className="consumption-report">
                  <div className="metrics-grid">
                    {Object.entries(generatedReport.data.metrics).map(([key, values]) => (
                      <div key={key} className="metric-card">
                        <h4>{getMetricName(key)}</h4>
                        <div className="metric-values">
                          {Object.entries(values).map(([k, v]) => (
                            <div key={k} className="metric-row">
                              <span className="metric-label">{getValueLabel(k)}:</span>
                              <span className="metric-value">{v} {getMetricUnit(key, k)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* График (заглушка) */}
              <div className="report-chart">
                <div className="chart-placeholder">
                  <i className="fas fa-chart-bar"></i>
                  <p>График {generatedReport.data.title.toLowerCase()}</p>
                </div>
              </div>
            </div>

            {/* Действия с отчетом */}
            <div className="report-actions">
              <button 
                className="action-btn primary"
                onClick={() => downloadReport('pdf')}
              >
                <i className="fas fa-file-pdf"></i> PDF
              </button>
              <button 
                className="action-btn primary"
                onClick={() => downloadReport('excel')}
              >
                <i className="fas fa-file-excel"></i> Excel
              </button>
              <button 
                className="action-btn"
                onClick={() => downloadReport('csv')}
              >
                <i className="fas fa-file-csv"></i> CSV
              </button>
              <button 
                className="action-btn"
                onClick={() => window.print()}
              >
                <i className="fas fa-print"></i> Печать
              </button>
            </div>
          </div>
        )}

        {/* История отчетов */}
        <div className="reports-history">
          <h3>Последние отчеты</h3>
          <div className="reports-list">
            {[1, 2, 3].map(id => (
              <div key={id} className="report-item">
                <div className="report-item-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="report-item-info">
                  <h4>Отчет за {id === 1 ? 'текущий' : 'прошлый'} месяц</h4>
                  <p>Сформирован {id === 1 ? 'сегодня' : `${id} дня назад`}</p>
                </div>
                <div className="report-item-actions">
                  <button className="icon-btn">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательные функции
const getMetricName = (key) => {
  const names = {
    temperature: 'Температура',
    electricity: 'Электричество',
    water: 'Вода',
    gas: 'Газ'
  };
  return names[key] || key;
};

const getValueLabel = (key) => {
  const labels = {
    avg: 'Среднее',
    min: 'Минимум',
    max: 'Максимум',
    total: 'Всего',
    avgDaily: 'Ср. в день',
    peak: 'Пик'
  };
  return labels[key] || key;
};

const getMetricUnit = (metric, value) => {
  if (metric === 'temperature') return '°C';
  if (metric === 'electricity') return value === 'peak' ? 'кВт' : 'кВт·ч';
  if (metric === 'water') return 'м³';
  if (metric === 'gas') return 'м³';
  return '';
};

export default Reports;