// pages/Admin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminTabs from '../components/Admin/AdminTabs';
import EventsTable from '../components/Admin/EventsTable';
import OrdersTable from '../components/Admin/OrderTable';
import EventModel from '../components/Admin/EventModel';    
import OrderModel from '../components/Admin/OrderModel';    
import '../styles/global.css';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  
  // Példa adatok
  const [events, setEvents] = useState([
    { id: 1, cim: "Őszi Diákkoncert", tipus: "Koncert", datum: "2024-11-15", helyszin: "Fő terem", regisztraltak: 45, kapacitas: 80, aktiv: true },
    { id: 2, cim: "Blues Gitár Mesterkurzus", tipus: "Workshop", datum: "2024-11-22", helyszin: "Stúdió A", regisztraltak: 28, kapacitas: 35, aktiv: true },
    { id: 3, cim: "Karácsonyi Koncert", tipus: "Koncert", datum: "2024-12-20", helyszin: "Fő terem", regisztraltak: 42, kapacitas: 100, aktiv: true },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, diak: "Kovács Péter", hangszer: "Yamaha C40 (Gitár)", datum: "2024-10-15", vissza: "2024-11-15", allapot: "aktív", ar: "5000 Ft/hó" },
    { id: 2, diak: "Nagy Anna", hangszer: "Yamaha P125 (Zongora)", datum: "2024-10-20", vissza: "2024-11-20", allapot: "aktív", ar: "8000 Ft/hó" },
    { id: 3, diak: "Szabó Béla", hangszer: "Stentor Hegedű", datum: "2024-09-01", vissza: "2024-10-01", allapot: "lezárult", ar: "4000 Ft/hó" },
  ]);

  // Model állapotok
  const [showEventModel, setShowEventModel] = useState(false);
  const [showOrderModel, setShowOrderModel] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/registration");

  // Esemény műveletek
  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventModel(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventModel(true);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt az eseményt?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...eventData } : e));
    } else {
      const newEvent = { id: events.length + 1, ...eventData, regisztraltak: 0, aktiv: true };
      setEvents([...events, newEvent]);
    }
    setShowEventModel(false);
  };

  // Rendelés műveletek
  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowOrderModel(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowOrderModel(true);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a rendelést?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...orderData } : o));
    } else {
      const newOrder = { id: orders.length + 1, ...orderData };
      setOrders([...orders, newOrder]);
    }
    setShowOrderModel(false);
  };

  return (
    <>
      <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #2A3B5C 0%, #1f2d4a 100%)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <div className="hero-text text-center">
                <h1 className="mb-4">Admin <span>Felület</span></h1>
                <p className="mb-4">Események és kölcsönzések kezelése</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section py-5">
        <div className="container">
          <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'events' && (
            <EventsTable 
              events={events}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onAdd={handleAddEvent}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTable 
              orders={orders}
              onEdit={handleEditOrder}
              onDelete={handleDeleteOrder}
              onAdd={handleAddOrder}
            />
          )}
        </div>
      </section>

      <EventModel 
        show={showEventModel}
        onClose={() => setShowEventModel(false)}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
      />

      <OrderModel 
        show={showOrderModel}
        onClose={() => setShowOrderModel(false)}
        onSave={handleSaveOrder}
        editingOrder={editingOrder}
      />

      <Footer />
    </>
  );
};

export default Admin;