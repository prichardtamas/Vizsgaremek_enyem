const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// GET végpont a tanárokhoz
app.get('/tanarok', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tanarok ORDER BY nev ASC');
        res.json(rows); // JSON-ban visszaadjuk az összes tanárt
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba történt a tanárok lekérdezésekor.' });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));