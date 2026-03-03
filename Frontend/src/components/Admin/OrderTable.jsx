// components/Admin/OrdersTable.jsx
import React from 'react';

const OrdersTable = ({ orders, onEdit, onDelete, onAdd }) => {
  return (
    <div className="admin-table-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Kölcsönzések kezelése</h3>
        <button className="btn btn-primary" onClick={onAdd}>
          <i className="fas fa-plus me-2"></i>
          Új kölcsönzés
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Diák</th>
              <th>Hangszer</th>
              <th>Kölcsönzés kezdete</th>
              <th>Vissza</th>
              <th>Díj</th>
              <th>Státusz</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.diak}</td>
                <td>{order.hangszer}</td>
                <td>{order.datum}</td>
                <td>{order.vissza}</td>
                <td>{order.ar}</td>
                <td>
                  <OrderStatusBadge status={order.allapot} />
                </td>
                <td>
                  <OrderActionButtons 
                    onEdit={() => onEdit(order)}
                    onDelete={() => onDelete(order.id)}
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

const OrderStatusBadge = ({ status }) => (
  <span className={`badge ${status === 'aktív' ? 'bg-success' : 'bg-secondary'}`}>
    {status}
  </span>
);

const OrderActionButtons = ({ onEdit, onDelete }) => (
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

export default OrdersTable;