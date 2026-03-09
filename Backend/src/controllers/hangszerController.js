const pool = require('../config/db');

exports.getHangszerek = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.*, kat.katNev, l.ar, l.elerhetoseg 
             FROM hangszerek h
             JOIN kategoriak kat ON h.katId = kat.id
             JOIN leltarak l ON h.leltarId = l.id
             ORDER BY kat.katNev, h.nev`
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getElerhetoHangszerek = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.*, kat.katNev, l.ar FROM hangszerek h
             JOIN kategoriak kat ON h.katId = kat.id
             JOIN leltarak l ON h.leltarId = l.id
             WHERE l.elerhetoseg = TRUE AND h.id NOT IN (
                 SELECT hangszerId FROM kolcsonzesek WHERE kolcsVeg >= CURDATE()
             )`
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getKategoriak = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM kategoriak ORDER BY katNev');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};