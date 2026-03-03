// components/Admin/EventModel.jsx
import React, { useState, useEffect } from 'react';

const EventModel = ({ show, onClose, onSave, editingEvent }) => {
  const [formData, setFormData] = useState({
    cim: '',
    tipus: 'Koncert',
    helyszin: '',
    datum: '',
    vegDatum: '',
    leiras: '',
    kapacitas: '',
    oktato: '',
    ar: ''
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        cim: editingEvent.cim || '',
        tipus: editingEvent.tipus || 'Koncert',
        helyszin: editingEvent.helyszin || '',
        datum: editingEvent.datum || '',
        vegDatum: editingEvent.vegDatum || '',
        leiras: editingEvent.leiras || '',
        kapacitas: editingEvent.kapacitas || '',
        oktato: editingEvent.oktato || '',
        ar: editingEvent.ar || ''
      });
    } else {
      setFormData({
        cim: '',
        tipus: 'Koncert',
        helyszin: '',
        datum: '',
        vegDatum: '',
        leiras: '',
        kapacitas: '',
        oktato: '',
        ar: ''
      });
    }
  }, [editingEvent, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingEvent ? 'Esemény szerkesztése' : 'Új esemény hozzáadása'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Esemény címe *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="cim"
                  value={formData.cim}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Típus *</label>
                  <select 
                    className="form-select" 
                    name="tipus"
                    value={formData.tipus}
                    onChange={handleChange}
                    required
                  >
                    <option value="Koncert">Koncert</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Kurzus">Kurzus</option>
                    <option value="Nyílt nap">Nyílt nap</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Helyszín</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="helyszin"
                    value={formData.helyszin}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Kezdés dátuma *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="datum"
                    value={formData.datum}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Befejezés dátuma *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="vegDatum"
                    value={formData.vegDatum}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Leírás</label>
                <textarea 
                  className="form-control" 
                  rows="3"
                  name="leiras"
                  value={formData.leiras}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Kapacitás</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="kapacitas"
                    value={formData.kapacitas}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Oktató</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="oktato"
                    value={formData.oktato}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Ár</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="ar"
                    value={formData.ar}
                    onChange={handleChange}
                    placeholder="pl. 3000 Ft"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Mégse
              </button>
              <button type="submit" className="btn btn-primary">
                {editingEvent ? 'Mentés' : 'Létrehozás'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModel;