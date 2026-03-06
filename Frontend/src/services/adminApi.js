const API_BASE_URL = 'http://localhost:3000/api/admin';

async function adminCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Hiba történt');
        }
        
        return data;
    } catch (error) {
        console.error('API hiba:', error);
        throw error;
    }
}

export const getTablak = () => adminCall('/tablak');

export const getTablaSzerkezet = (tabla) => 
    adminCall(`/tablak/${tabla}/szerkezet`);

export const getTablaAdatok = (tabla, page = 1, limit = 50) => 
    adminCall(`/tablak/${tabla}/adatok?page=${page}&limit=${limit}`);

export const createRekord = (tabla, adatok) => 
    adminCall(`/tablak/${tabla}`, {
        method: 'POST',
        body: JSON.stringify(adatok)
    });

export const updateRekord = (tabla, id, adatok) => 
    adminCall(`/tablak/${tabla}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(adatok)
    });

export const deleteRekord = (tabla, id) => 
    adminCall(`/tablak/${tabla}/${id}`, {
        method: 'DELETE'
    });