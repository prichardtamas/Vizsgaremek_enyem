const db = require('../config/db');

// 1. Táblák listázása
exports.getTables = async (req, res) => {
    try {
        const [rows] = await db.query('SHOW TABLES');
        const tables = rows.map(row => Object.values(row)[0]);
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: 'Hiba a táblák listázásakor' });
    }
};

// 2. Tábla szerkezet (Oszlopnevek, típusok)
exports.getTableStructure = async (req, res) => {
    try {
        const { table } = req.params;
        const [rows] = await db.query('DESCRIBE ??', [table]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Hiba a szerkezet lekérésekor' });
    }
};

// 3. Adatok lekérése lapozással
exports.getTableData = async (req, res) => {
    try {
        const { table } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const offset = (page - 1) * limit;

        const [countResult] = await db.query('SELECT COUNT(*) as total FROM ??', [table]);
        const total = countResult[0].total;

        const [rows] = await db.query('SELECT * FROM ?? LIMIT ? OFFSET ?', [table, limit, offset]);
        
        res.json({
            data: rows,
            total: total,
            page: page
        });
    } catch (error) {
        res.status(500).json({ error: 'Hiba az adatok lekérésekor' });
    }
};

// 4. Új rekord hozzáadása
exports.createRecord = async (req, res) => {
    try {
        const { table } = req.params;
        const data = req.body;
        const [result] = await db.query('INSERT INTO ?? SET ?', [table, data]);
        res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Hiba a mentés során' });
    }
};

// 5. Rekord módosítása (Dinamikus PK kezeléssel)
exports.updateRecord = async (req, res) => {
    try {
        const { table, id } = req.params;
        const data = req.body;

        // Megkeressük az elsődleges kulcs nevét (pl. 'id' vagy 'user_id')
        const [structure] = await db.query('DESCRIBE ??', [table]);
        const pkField = structure.find(f => f.Key === 'PRI')?.Field || 'id';

        // Frissítés a megtalált kulcs alapján
        const [result] = await db.query('UPDATE ?? SET ? WHERE ?? = ?', [table, data, pkField, id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Rekord nem található' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Hiba a módosítás során' });
    }
};

// 6. Rekord törlése (Dinamikus PK kezeléssel)
exports.deleteRecord = async (req, res) => {
    try {
        const { table, id } = req.params;

        const [structure] = await db.query('DESCRIBE ??', [table]);
        const pkField = structure.find(f => f.Key === 'PRI')?.Field || 'id';

        const [result] = await db.query('DELETE FROM ?? WHERE ?? = ?', [table, pkField, id]);

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Rekord nem található' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Hiba a törlés során' });
    }
};