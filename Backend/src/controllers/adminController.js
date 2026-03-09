const pool = require('../config/db');

exports.getTablak = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT TABLE_NAME as nev, TABLE_ROWS as sorok_szama
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME`, [process.env.DB_NAME]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTablaAdatok = async (req, res) => {
    const { tabla } = req.params;
    try {
        const [rows] = await pool.query(`SELECT * FROM ??`, [tabla]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteRekord = async (req, res) => {
    const { tabla, id } = req.params;
    try {
        // Megkeressük az elsődleges kulcs nevét (id, katId, stb.)
        const [pkResult] = await pool.query(`
            SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_KEY = 'PRI'`, 
            [process.env.DB_NAME, tabla]);
        
        if (pkResult.length === 0) return res.status(400).json({ error: 'Nincs elsődleges kulcs' });
        const pkField = pkResult[0].COLUMN_NAME;

        await pool.query(`DELETE FROM ?? WHERE ?? = ?`, [tabla, pkField, id]);
        res.json({ message: 'Törölve' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};