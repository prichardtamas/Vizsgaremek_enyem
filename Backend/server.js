const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ============ BEJELENTKEZÉS VÉGPONTOK ============
app.post('/api/login', async (req, res) => {
    const { fnev, jelszo } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT id, fnev, jogosultsag, email FROM bejelentkezesek WHERE fnev = ? AND jelszo = ?',
            [fnev, jelszo]
        );
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ TANÁROK VÉGPONTOK ============
app.get('/api/tanarok', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tanarok ORDER BY nev');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/tanarok/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tanarok WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Tanár nem található' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/tanarok/:id/kepessegek', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT kepesseg FROM tanar_mit_tud WHERE tanarId = ?',
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/tanarok/:id/orak', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT o.*, d.nev as diak_neve 
             FROM orak o 
             JOIN diakok d ON o.diakId = d.id 
             WHERE o.tanarId = ?`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ DIÁKOK VÉGPONTOK ============
app.get('/api/diakok', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM diakok ORDER BY nev');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/diakok/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM diakok WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Diák nem található' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/diakok/:id/orak', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT o.*, t.nev as tanar_neve 
             FROM orak o 
             JOIN tanarok t ON o.tanarId = t.id 
             WHERE o.diakId = ?`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/diakok/:id/kolcsonzesek', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT k.*, h.nev as hangszer_neve, kat.katNev 
             FROM kolcsonzesek k
             JOIN hangszerek h ON k.hangszerId = h.id
             JOIN kategoriak kat ON h.katId = kat.id
             WHERE k.diakId = ? 
             ORDER BY k.kolcsKezd DESC`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ HANGSZEREK VÉGPONTOK ============
app.get('/api/hangszerek', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.*, kat.katNev, l.ar, l.elerhetoseg 
             FROM hangszerek h
             JOIN kategoriak kat ON h.katId = kat.id
             JOIN leltarak l ON h.leltarId = l.id
             ORDER BY kat.katNev, h.nev`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/hangszerek/kategoria/:katId', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.*, l.ar, l.elerhetoseg 
             FROM hangszerek h
             JOIN leltarak l ON h.leltarId = l.id
             WHERE h.katId = ?`,
            [req.params.katId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/hangszerek/elerheto', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT h.*, kat.katNev, l.ar 
             FROM hangszerek h
             JOIN kategoriak kat ON h.katId = kat.id
             JOIN leltarak l ON h.leltarId = l.id
             WHERE l.elerhetoseg = TRUE
             AND h.id NOT IN (
                 SELECT hangszerId FROM kolcsonzesek 
                 WHERE kolcsVeg >= CURDATE()
             )`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ KÖLCSÖNZÉSEK VÉGPONTOK ============
app.get('/api/kolcsonzesek', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT k.*, 
                    d.nev as diak_neve, 
                    h.nev as hangszer_neve,
                    kat.katNev
             FROM kolcsonzesek k
             JOIN diakok d ON k.diakId = d.id
             JOIN hangszerek h ON k.hangszerId = h.id
             JOIN kategoriak kat ON h.katId = kat.id
             ORDER BY k.kolcsKezd DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/kolcsonzesek', async (req, res) => {
    const { hangszerId, diakId, kolcsVeg, megjegyzes } = req.body;
    
    try {
        const [elerheto] = await pool.query(
            `SELECT l.elerhetoseg FROM hangszerek h
             JOIN leltarak l ON h.leltarId = l.id
             WHERE h.id = ? AND l.elerhetoseg = TRUE`,
            [hangszerId]
        );
        
        if (elerheto.length === 0) {
            return res.status(400).json({ error: 'A hangszer nem elérhető' });
        }

        const [result] = await pool.query(
            `INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes) 
             VALUES (?, ?, ?, ?)`,
            [hangszerId, diakId, kolcsVeg, megjegyzes]
        );
        
        await pool.query(
            `UPDATE leltarak l
             JOIN hangszerek h ON l.id = h.leltarId
             SET l.elerhetoseg = FALSE
             WHERE h.id = ?`,
            [hangszerId]
        );
        
        res.status(201).json({ id: result.insertId, message: 'Kölcsönzés rögzítve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/kolcsonzesek/:id/visszahoz', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [kolcsonzes] = await pool.query(
            'SELECT hangszerId FROM kolcsonzesek WHERE id = ?',
            [id]
        );
        
        if (kolcsonzes.length === 0) {
            return res.status(404).json({ error: 'Kölcsönzés nem található' });
        }
        
        await pool.query('DELETE FROM kolcsonzesek WHERE id = ?', [id]);
        
        await pool.query(
            `UPDATE leltarak l
             JOIN hangszerek h ON l.id = h.leltarId
             SET l.elerhetoseg = TRUE
             WHERE h.id = ?`,
            [kolcsonzes[0].hangszerId]
        );
        
        res.json({ message: 'Hangszer visszahozva' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ KATEGÓRIÁK VÉGPONTOK ============
app.get('/api/kategoriak', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM kategoriak ORDER BY katNev');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ ÓRÁK VÉGPONTOK ============
app.get('/api/orak', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT o.*, 
                    t.nev as tanar_neve,
                    d.nev as diak_neve
             FROM orak o
             JOIN tanarok t ON o.tanarId = t.id
             JOIN diakok d ON o.diakId = d.id
             ORDER BY o.id DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orak', async (req, res) => {
    const { tanarId, diakId, tema } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO orak (tanarId, diakId, tema) VALUES (?, ?, ?)',
            [tanarId, diakId, tema]
        );
        res.status(201).json({ id: result.insertId, message: 'Óra rögzítve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ STATISZTIKÁK ============
app.get('/api/statisztika/nepszeru_hangszerek', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT kat.katNev, COUNT(k.id) as kolcsonzesek_szama
             FROM kategoriak kat
             LEFT JOIN hangszerek h ON kat.id = h.katId
             LEFT JOIN kolcsonzesek k ON h.id = k.hangszerId
             GROUP BY kat.id, kat.katNev
             ORDER BY kolcsonzesek_szama DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/statisztika/tanarok_orai', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT t.nev, COUNT(o.id) as orak_szama
             FROM tanarok t
             LEFT JOIN orak o ON t.id = o.tanarId
             GROUP BY t.id, t.nev
             ORDER BY orak_szama DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/statisztika/aktiv_diakok', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT d.nev, 
                    COUNT(DISTINCT o.id) as orak_szama,
                    COUNT(DISTINCT k.id) as kolcsonzesek_szama
             FROM diakok d
             LEFT JOIN orak o ON d.id = o.diakId
             LEFT JOIN kolcsonzesek k ON d.id = k.diakId
             GROUP BY d.id, d.nev
             HAVING orak_szama > 0 OR kolcsonzesek_szama > 0
             ORDER BY orak_szama DESC, kolcsonzesek_szama DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ ADMIN VÉGPONTOK ============
// Összes tábla listázása
app.get('/api/admin/tablak', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                TABLE_NAME as nev,
                TABLE_ROWS as sorok_szama
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = ?
            ORDER BY TABLE_NAME
        `, [process.env.DB_NAME]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tábla szerkezetének lekérése
app.get('/api/admin/tablak/:tabla/szerkezet', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                COLUMN_NAME as mezo,
                DATA_TYPE as tipus,
                IS_NULLABLE as lehet_nullas,
                COLUMN_KEY as kulcs,
                COLUMN_DEFAULT as alap_ertek
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            ORDER BY ORDINAL_POSITION
        `, [process.env.DB_NAME, req.params.tabla]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tábla adatainak lekérése (lapozással)
app.get('/api/admin/tablak/:tabla/adatok', async (req, res) => {
    const { tabla } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    try {
        // Összes sor számlálása
        const [countResult] = await pool.query(`SELECT COUNT(*) as total FROM ??`, [tabla]);
        const total = countResult[0].total;
        
        // Adatok lekérése
        const [rows] = await pool.query(
            `SELECT * FROM ?? LIMIT ? OFFSET ?`,
            [tabla, limit, offset]
        );
        
        res.json({
            adatok: rows,
            osszesen: total,
            oldal: page,
            oldalMeret: limit,
            oldalakSzama: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Új rekord létrehozása
app.post('/api/admin/tablak/:tabla', async (req, res) => {
    const { tabla } = req.params;
    const adatok = req.body;
    
    try {
        const [result] = await pool.query(`INSERT INTO ?? SET ?`, [tabla, adatok]);
        res.status(201).json({ 
            id: result.insertId,
            message: 'Rekord sikeresen létrehozva' 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rekord módosítása
app.put('/api/admin/tablak/:tabla/:id', async (req, res) => {
    const { tabla, id } = req.params;
    const adatok = req.body;
    
    try {
        const [pkResult] = await pool.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_KEY = 'PRI'
        `, [process.env.DB_NAME, tabla]);
        
        if (pkResult.length === 0) {
            return res.status(400).json({ error: 'Nincs elsődleges kulcs' });
        }
        
        const pkField = pkResult[0].COLUMN_NAME;
        
        const [result] = await pool.query(
            `UPDATE ?? SET ? WHERE ?? = ?`,
            [tabla, adatok, pkField, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rekord nem található' });
        }
        
        res.json({ message: 'Rekord sikeresen módosítva' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rekord törlése
app.delete('/api/admin/tablak/:tabla/:id', async (req, res) => {
    const { tabla, id } = req.params;
    
    try {
        const [pkResult] = await pool.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_KEY = 'PRI'
        `, [process.env.DB_NAME, tabla]);
        
        if (pkResult.length === 0) {
            return res.status(400).json({ error: 'Nincs elsődleges kulcs' });
        }
        
        const pkField = pkResult[0].COLUMN_NAME;
        
        const [result] = await pool.query(
            `DELETE FROM ?? WHERE ?? = ?`,
            [tabla, pkField, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rekord nem található' });
        }
        
        res.json({ message: 'Rekord sikeresen törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Zeneiskola API működik' });
});

// 404 kezelés
app.use((req, res) => {
    res.status(404).json({ error: 'A keresett végpont nem található' });
});

// Hibakezelő middleware
app.use((err, req, res, next) => {
    console.error('Váratlan hiba:', err);
    res.status(500).json({ error: 'Váratlan hiba történt a szerveren' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Zeneiskola API fut: http://localhost:${PORT}`);
    console.log(`📚 Végpontok: http://localhost:${PORT}/api/...`);
    console.log(`👑 Admin végpontok: http://localhost:${PORT}/api/admin/tablak`);
});