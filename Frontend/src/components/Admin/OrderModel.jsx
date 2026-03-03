// components/Admin/OrderModel.jsx
import React, { useState, useEffect } from 'react';

const OrderModel = ({ show, onClose, onSave, editingOrder }) => {
  const [formData, setFormData] = useState({
    diak: '',
    hangszer: '',
    datum: '',
    vissza: '',
    ar: '',
    allapot: 'aktív'
  });

  useEffect(() => {
    if (editingOrder) {
      setFormData({
        diak: editingOrder.diak || '',
        hangszer: editingOrder.hangszer || '',
        datum: editingOrder.datum || '',
        vissza: editingOrder.vissza || '',
        ar: editingOrder.ar || '',
        allapot: editingOrder.allapot || 'aktív'
      });
    } else {
      setFormData({
        diak: '',
        hangszer: '',
        datum: '',
        vissza: '',
        ar: '',
        allapot: 'aktív'
      });
    }
  }, [editingOrder, show]);

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
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingOrder ? 'Kölcsönzés szerkesztése' : 'Új kölcsönzés hozzáadása'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Diák *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="diak"
                  value={formData.diak}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hangszer *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="hangszer"
                  value={formData.hangszer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Kölcsönzés kezdete *</label>
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
                  <label className="form-label">Vissza *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="vissza"
                    value={formData.vissza}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Díj</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="ar"
                  value={formData.ar}
                  onChange={handleChange}
                  placeholder="pl. 5000 Ft/hó"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Státusz</label>
                <select 
                  className="form-select" 
                  name="allapot"
                  value={formData.allapot}
                  onChange={handleChange}
                >
                  <option value="aktív">Aktív</option>
                  <option value="lezárult">Lezárult</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Mégse
              </button>
              <button type="submit" className="btn btn-primary">
                {editingOrder ? 'Mentés' : 'Létrehozás'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModel;