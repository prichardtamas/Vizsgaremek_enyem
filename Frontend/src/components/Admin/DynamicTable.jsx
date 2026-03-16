import React, { useState, useEffect } from 'react';

// Állítsd be a backended alap útvonalát ide:
const API_BASE_URL = 'http://localhost:3000/api/admin/tablak';

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

  // 1. Adatok lekérése (adminController: getTableData alapján)
  const loadAdatok = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${tablaNeve}/adatok?page=${oldal}&limit=50`);
      if (!response.ok) throw new Error('Hiba az adatok betöltésekor');
      
      const data = await response.json();
      // Az adminController 'data' és 'total' mezőket ad vissza
      setAdatok(data.data);
      setOsszesen(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Szerkezet lekérése (adminController: getTableStructure alapján)
  const loadSzerkezet = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${tablaNeve}/szerkezet`);
      if (!response.ok) throw new Error('Hiba a szerkezet betöltésekor');
      
      const data = await response.json();
      setSzerkezet(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Új rekord (adminController: createRecord alapján)
  const handleUjRekord = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${tablaNeve}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ujRekord)
      });
      
      if (!response.ok) throw new Error('Nem sikerült a mentés');
      
      setUjRekord({});
      setMutatUjForm(false);
      loadAdatok(); // Újratöltjük a táblát a mentés után
    } catch (err) {
      alert('Hiba: ' + err.message);
    }
  };

  // 4. Módosítás (adminController: updateRecord alapján)
  const handleModositas = async (id) => {
    try {
      const pkMezo = szerkezet.find(m => m.Key === 'PRI')?.Field || 'id';
      const modositottAdat = adatok.find(a => a[pkMezo] === id);
      
      const response = await fetch(`${API_BASE_URL}/${tablaNeve}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modositottAdat)
      });

      if (!response.ok) throw new Error('Nem sikerült a módosítás');
      
      setSzerkesztettId(null);
      loadAdatok();
    } catch (err) {
      alert('Hiba: ' + err.message);
    }
  };

  // 5. Törlés (adminController: deleteRecord alapján)
  const handleTorles = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a rekordot?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${tablaNeve}/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Nem sikerült a törlés');
        
        loadAdatok();
      } catch (err) {
        alert('Hiba: ' + err.message);
      }
    }
  };

  const formatErtek = (ertek, tipus) => {
    if (ertek === null || ertek === undefined) return '-';
    // MySQL típusok angolul érkeznek (Type)
    if (tipus?.toLowerCase().includes('date') && ertek) {
      return new Date(ertek).toLocaleDateString('hu-HU');
    }
    if (tipus?.toLowerCase().includes('tinyint') && (typeof ertek === 'boolean' || ertek === 0 || ertek === 1)) {
      return ertek ? 'Igen' : 'Nem';
    }
    return String(ertek);
  };

  if (loading) return <div className="text-center p-5">Betöltés...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // A MySQL DESCRIBE alapján a kulcs 'Key', az oszlop neve 'Field'
  const pkMezo = szerkezet.find(m => m.Key === 'PRI')?.Field || 'id';

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
                .filter(mezo => mezo.Key !== 'PRI')
                .map(mezo => (
                  <div className="col-md-4 mb-3" key={mezo.Field}>
                    <label className="form-label">{mezo.Field}</label>
                    <input
                      type={mezo.Type.includes('date') ? 'date' : 'text'}
                      className="form-control"
                      value={ujRekord[mezo.Field] || ''}
                      onChange={(e) => setUjRekord({
                        ...ujRekord,
                        [mezo.Field]: e.target.value
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
                <th key={mezo.Field}>{mezo.Field}</th>
              ))}
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {adatok.map(record => (
              <tr key={record[pkMezo]}>
                {szerkezet.map(mezo => (
                  <td key={mezo.Field}>
                    {szerkesztettId === record[pkMezo] ? (
                      <input
                        type={mezo.Type.includes('date') ? 'date' : 'text'}
                        className="form-control form-control-sm"
                        value={record[mezo.Field] || ''}
                        onChange={(e) => {
                          const newAdatok = [...adatok];
                          const idx = newAdatok.findIndex(r => r[pkMezo] === record[pkMezo]);
                          newAdatok[idx][mezo.Field] = e.target.value;
                          setAdatok(newAdatok);
                        }}
                      />
                    ) : (
                      formatErtek(record[mezo.Field], mezo.Type)
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
                        <i className="fas fa-save"></i> Mentés
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => setSzerkesztettId(null)}
                      >
                        <i className="fas fa-times"></i> Mégse
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
        <span className="mx-3">{oldal} / {Math.ceil(osszesen / 50) || 1}</span>
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