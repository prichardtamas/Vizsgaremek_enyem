const pool = require('../config/db');

exports.getAllTanar = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tanarok');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};