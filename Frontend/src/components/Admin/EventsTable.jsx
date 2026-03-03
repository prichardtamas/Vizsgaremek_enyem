// components/Admin/EventsTable.jsx
import React from 'react';

const EventsTable = ({ events, onEdit, onDelete, onAdd }) => {
  return (
    <div className="admin-table-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Események kezelése</h3>
        <button className="btn btn-primary" onClick={onAdd}>
          <i className="fas fa-plus me-2"></i>
          Új esemény
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Cím</th>
              <th>Típus</th>
              <th>Dátum</th>
              <th>Helyszín</th>
              <th>Regisztráltak</th>
              <th>Kapacitás</th>
              <th>Státusz</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>#{event.id}</td>
                <td>{event.cim}</td>
                <td>
                  <EventTypeBadge type={event.tipus} />
                </td>
                <td>{event.datum}</td>
                <td>{event.helyszin}</td>
                <td>{event.regisztraltak}/{event.kapacitas}</td>
                <td>
                  <CapacityProgress registered={event.regisztraltak} capacity={event.kapacitas} />
                </td>
                <td>
                  <StatusBadge active={event.aktiv} />
                </td>
                <td>
                  <ActionButtons 
                    onEdit={() => onEdit(event)}
                    onDelete={() => onDelete(event.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Segéd komponensek
const EventTypeBadge = ({ type }) => {
  const getBadgeClass = () => {
    switch(type) {
      case 'Koncert': return 'bg-primary';
      case 'Workshop': return 'bg-warning text-dark';
      default: return 'bg-info';
    }
  };

  return <span className={`badge ${getBadgeClass()}`}>{type}</span>;
};

const CapacityProgress = ({ registered, capacity }) => {
  const percentage = (registered / capacity) * 100;
  return (
    <div className="progress" style={{ height: '5px', width: '80px' }}>
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const StatusBadge = ({ active }) => (
  <span className={`badge ${active ? 'bg-success' : 'bg-secondary'}`}>
    {active ? 'Aktív' : 'Inaktív'}
  </span>
);

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="d-flex gap-2">
    <button 
      className="btn btn-sm btn-outline-primary rounded-circle" 
      onClick={onEdit}
      style={{ width: '32px', height: '32px', padding: '0' }}
      title="Szerkesztés"
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <i className="fas fa-edit"></i>
      </span>
    </button>
    <button 
      className="btn btn-sm btn-outline-danger rounded-circle" 
      onClick={onDelete}
      style={{ width: '32px', height: '32px', padding: '0' }}
      title="Törlés"
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <i className="fas fa-trash"></i>
      </span>
    </button>
  </div>
);

export default EventsTable;