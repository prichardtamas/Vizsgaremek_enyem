import React, { useState, useEffect } from 'react';
import * as adminApi from '../../services/adminApi';

const DynamicTable = ({ tablaNeve }) => {
  const [adatok, setAdatok] = useState([]);
  const [szerkezet, setSzerkezet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [oldal, setOldal] = useState(1);
  const [osszesen, setOsszesen] = useState(0);
  const [mutatUjForm, setMutatUjForm] = useState(false);
  const [ujRekord, setUjRekord] = useState({});
  const [szerkesztettId, setSzerkesztettId] = useState(null);

  useEffect(() => {
    if (tablaNeve) {
      loadAdatok();
      loadSzerkezet();
    }
  }, [tablaNeve, oldal]);

  const loadAdatok = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getTablaAdatok(tablaNeve, oldal);
      setAdatok(response.adatok);
      setOsszesen(response.osszesen);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSzerkezet = async () => {
    try {
      const data = await adminApi.getTablaSzerkezet(tablaNeve);
      setSzerkezet(data);
    } catch (err) {
      console.error('Hiba a szerkezet betöltésekor:', err);
    }
  };

  const handleUjRekord = async () => {
    try {
      await adminApi.createRekord(tablaNeve, ujRekord);
      setUjRekord({});
      setMutatUjForm(false);
      loadAdatok();
    } catch (err) {
      alert('Hiba: ' + err.message);
    }
  };

  const handleModositas = async (id) => {
    try {
      const modositottAdat = adatok.find(a => a.id === id);
      await adminApi.updateRekord(tablaNeve, id, modositottAdat);
      setSzerkesztettId(null);
      loadAdatok();
    } catch (err) {
      alert('Hiba: ' + err.message);
    }
  };

  const handleTorles = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a rekordot?')) {
      try {
        await adminApi.deleteRekord(tablaNeve, id);
        loadAdatok();
      } catch (err) {
        alert('Hiba: ' + err.message);
      }
    }
  };

  const formatErtek = (ertek, tipus) => {
    if (ertek === null || ertek === undefined) return '-';
    if (tipus?.includes('date') && ertek) {
      return new Date(ertek).toLocaleDateString('hu-HU');
    }
    if (tipus === 'tinyint' && typeof ertek === 'boolean') {
      return ertek ? 'Igen' : 'Nem';
    }
    return String(ertek);
  };

  if (loading) return <div className="text-center p-5">Betöltés...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const pkMezo = szerkezet.find(m => m.kulcs === 'PRI')?.mezo || 'id';

  return (
    <div className="dynamic-table-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{tablaNeve} kezelése</h3>
        <button className="btn btn-primary" onClick={() => setMutatUjForm(!mutatUjForm)}>
          <i className="fas fa-plus me-2"></i>
          Új {tablaNeve.slice(0, -1)}
        </button>
      </div>

      {mutatUjForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Új rekord</h5>
            <div className="row">
              {szerkezet
                .filter(mezo => mezo.kulcs !== 'PRI')
                .map(mezo => (
                  <div className="col-md-4 mb-3" key={mezo.mezo}>
                    <label className="form-label">{mezo.mezo}</label>
                    <input
                      type={mezo.tipus.includes('date') ? 'date' : 'text'}
                      className="form-control"
                      value={ujRekord[mezo.mezo] || ''}
                      onChange={(e) => setUjRekord({
                        ...ujRekord,
                        [mezo.mezo]: e.target.value
                      })}
                    />
                  </div>
                ))}
            </div>
            <button className="btn btn-success me-2" onClick={handleUjRekord}>
              Mentés
            </button>
            <button className="btn btn-secondary" onClick={() => setMutatUjForm(false)}>
              Mégse
            </button>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              {szerkezet.map(mezo => (
                <th key={mezo.mezo}>{mezo.mezo}</th>
              ))}
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {adatok.map(record => (
              <tr key={record[pkMezo]}>
                {szerkezet.map(mezo => (
                  <td key={mezo.mezo}>
                    {szerkesztettId === record[pkMezo] ? (
                      <input
                        type={mezo.tipus.includes('date') ? 'date' : 'text'}
                        className="form-control form-control-sm"
                        value={record[mezo.mezo] || ''}
                        onChange={(e) => {
                          const newAdatok = [...adatok];
                          const idx = newAdatok.findIndex(r => r[pkMezo] === record[pkMezo]);
                          newAdatok[idx][mezo.mezo] = e.target.value;
                          setAdatok(newAdatok);
                        }}
                      />
                    ) : (
                      formatErtek(record[mezo.mezo], mezo.tipus)
                    )}
                  </td>
                ))}
                <td>
                  {szerkesztettId === record[pkMezo] ? (
                    <>
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleModositas(record[pkMezo])}
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => setSzerkesztettId(null)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setSzerkesztettId(record[pkMezo])}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleTorles(record[pkMezo])}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => setOldal(o => Math.max(1, o-1))}
          disabled={oldal === 1}
        >
          Előző
        </button>
        <span className="mx-3">{oldal} / {Math.ceil(osszesen / 50)}</span>
        <button 
          className="btn btn-outline-primary ms-2"
          onClick={() => setOldal(o => o+1)}
          disabled={oldal >= Math.ceil(osszesen / 50)}
        >
          Következő
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;