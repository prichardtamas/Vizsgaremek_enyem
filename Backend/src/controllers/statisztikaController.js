const pool = require('../config/db');

exports.getNepszeruHangszerek = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT kat.katNev, COUNT(k.id) as kolcsonzesek_szama
            FROM kategoriak kat
            LEFT JOIN hangszerek h ON kat.id = h.katId
            LEFT JOIN kolcsonzesek k ON h.id = k.hangszerId
            GROUP BY kat.id, kat.katNev ORDER BY kolcsonzesek_szama DESC`);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTanarokOrai = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT t.nev, COUNT(o.id) as orak_szama
            FROM tanarok t
            LEFT JOIN orak o ON t.id = o.tanarId
            GROUP BY t.id, t.nev ORDER BY orak_szama DESC`);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};