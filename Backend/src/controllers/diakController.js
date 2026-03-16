const pool = require('../config/db');

exports.getAllDiak = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM diakok');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};