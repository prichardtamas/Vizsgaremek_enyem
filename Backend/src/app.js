const express = require('express');
const cors = require('cors');

// 1. Útvonalak (Route-ok) beimportálása
// Fontos: Ezeknek a fájloknak létezniük kell a src/routes/ mappában, 
// különben a szerver induláskor hibát dob!
const authRoutes = require('./routes/authRoutes');
const tanarRoutes = require('./routes/tanarRoutes');
const diakRoutes = require('./routes/diakRoutes');
const hangszerRoutes = require('./routes/hangszerRoutes');
const statisztikaRoutes = require('./routes/statisztikaRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 2. Alapvető Middleware-ek (Beállítások)
app.use(cors()); // Megengedi, hogy a frontend (pl. React vagy Vue) kommunikáljon vele
app.use(express.json()); // Ezzel tudja a szerver értelmezni a bejövő JSON adatokat

// 3. Végpontok (API végpontok) bekötése
app.use('/api/auth', authRoutes);             // Bejelentkezés
app.use('/api/tanarok', tanarRoutes);         // Tanárok adatai
app.use('/api/diakok', diakRoutes);           // Diákok adatai
app.use('/api/hangszerek', hangszerRoutes);   // Hangszerek és kölcsönzések
app.use('/api/statisztika', statisztikaRoutes); // Statisztikák (népszerű hangszerek stb.)
app.use('/api/admin', adminRoutes);           // Admin felület funkciói

// 4. "Health Check" - Egy egyszerű végpont, amivel tesztelheted, hogy fut-e a szerver
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'A Zeneiskola API tökéletesen fut!' });
});

// 5. 404 Hibakezelő - Ha valaki olyan URL-t ír be, ami nem létezik
app.use((req, res, next) => {
    res.status(404).json({ message: 'A keresett végpont nem található!' });
});

// 6. Általános hibakezelő (Ha valami összeomlik a háttérben)
app.use((err, req, res, next) => {
    console.error("Váratlan hiba történt:", err);
    res.status(500).json({ message: 'Szerveroldali hiba történt!' });
});

module.exports = app; // Exportáljuk, hogy a server.js tudja használni