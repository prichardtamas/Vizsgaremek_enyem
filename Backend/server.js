const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// MySQL adatbázis kapcsolat
const pool = mysql.createPool({
    host: 'localhost',    // vagy 'db' ha Docker konténerből hívod
    user: 'root',
    password: 'rootpw',
    database: 'zeneiskola_mysql',
    port: 3307            // a Dockerben kitet port
});

// Táblák létrehozása
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // Bejelentkezés tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS bejelentkezesek (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fnev VARCHAR(255) NOT NULL,
                jelszo VARCHAR(255) NOT NULL,
                jogosultsag VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL
            )
        `);

        // Kategória tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS kategoriak (
                id INT AUTO_INCREMENT PRIMARY KEY,
                katNev VARCHAR(255) NOT NULL
            )
        `);

        // Leltár tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS leltarak (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ar INT NOT NULL,
                elerhetoseg BOOLEAN DEFAULT TRUE
            )
        `);

        // Hangszer tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS hangszerek (
                id INT AUTO_INCREMENT PRIMARY KEY,
                katId INT NOT NULL,
                leltarId INT NOT NULL,
                nev VARCHAR(255) NOT NULL,
                FOREIGN KEY (katId) REFERENCES kategoriak(id),
                FOREIGN KEY (leltarId) REFERENCES leltarak(id)
            )
        `);

        // Diák tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS diakok (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nev VARCHAR(255) NOT NULL,
                telefonsz VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL,
                szulDatum DATE NOT NULL,
                sajatHangszer VARCHAR(255)
            )
        `);

        // Tanár tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS tanarok (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nev VARCHAR(255) NOT NULL,
                telefonsz VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL
            )
        `);

        // KiMitTud tábla (kapcsolótábla)
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS kimittud (
                tanarId INT NOT NULL,
                hangszerId INT NOT NULL,
                PRIMARY KEY (tanarId, hangszerId),
                FOREIGN KEY (tanarId) REFERENCES tanarok(id),
                FOREIGN KEY (hangszerId) REFERENCES hangszerek(id)
            )
        `);

        // Óra tábla
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS orak (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tanarId INT NOT NULL,
                diakId INT NOT NULL,
                tema VARCHAR(255) NOT NULL,
                FOREIGN KEY (tanarId) REFERENCES tanarok(id),
                FOREIGN KEY (diakId) REFERENCES diakok(id)
            )
        `);

await connection.execute(`
CREATE TABLE IF NOT EXISTS kolcsonzesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hangszerId INT NOT NULL,
    diakId INT NOT NULL,
    kolcsKezd TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    kolcsVeg DATE NOT NULL,
    megjegyzes TEXT,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id),
    FOREIGN KEY (diakId) REFERENCES diakok(id)
)
`);


        connection.release();
        console.log('Adatbázis táblák létrehozva/ellenőrizve');
    } catch (err) {
        console.error('Hiba az adatbázis inicializálásakor:', err);
    }
}

// Diák CRUD műveletek
app.get('/api/diakok', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM diakok');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/diakok/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM diakok WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen diák' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/diakok', async (req, res) => {
    try {
        const { nev, telefonsz, email, szulDatum, sajatHangszer } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO diakok (nev, telefonsz, email, szulDatum, sajatHangszer) VALUES (?, ?, ?, ?, ?)',
            [nev, telefonsz, email, szulDatum, sajatHangszer]
        );
        const [newRow] = await pool.execute('SELECT * FROM diakok WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/diakok/:id', async (req, res) => {
    try {
        const { nev, telefonsz, email, szulDatum, sajatHangszer } = req.body;
        const [result] = await pool.execute(
            'UPDATE diakok SET nev = ?, telefonsz = ?, email = ?, szulDatum = ?, sajatHangszer = ? WHERE id = ?',
            [nev, telefonsz, email, szulDatum, sajatHangszer, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen diák' });
        const [updatedRow] = await pool.execute('SELECT * FROM diakok WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/diakok/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM diakok WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen diák' });
        res.json({ message: 'Diák törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tanár CRUD műveletek
app.get('/api/tanarok', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM tanarok');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/tanarok/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM tanarok WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen tanár' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/tanarok', async (req, res) => {
    try {
        const { nev, telefonsz, email } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO tanarok (nev, telefonsz, email) VALUES (?, ?, ?)',
            [nev, telefonsz, email]
        );
        const [newRow] = await pool.execute('SELECT * FROM tanarok WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/tanarok/:id', async (req, res) => {
    try {
        const { nev, telefonsz, email } = req.body;
        const [result] = await pool.execute(
            'UPDATE tanarok SET nev = ?, telefonsz = ?, email = ? WHERE id = ?',
            [nev, telefonsz, email, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen tanár' });
        const [updatedRow] = await pool.execute('SELECT * FROM tanarok WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/tanarok/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM tanarok WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen tanár' });
        res.json({ message: 'Tanár törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Hangszer CRUD műveletek
app.get('/api/hangszerek', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM hangszerek');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/hangszerek/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM hangszerek WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen hangszer' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/hangszerek', async (req, res) => {
    try {
        const { katId, leltarId, nev } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO hangszerek (katId, leltarId, nev) VALUES (?, ?, ?)',
            [katId, leltarId, nev]
        );
        const [newRow] = await pool.execute('SELECT * FROM hangszerek WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/hangszerek/:id', async (req, res) => {
    try {
        const { katId, leltarId, nev } = req.body;
        const [result] = await pool.execute(
            'UPDATE hangszerek SET katId = ?, leltarId = ?, nev = ? WHERE id = ?',
            [katId, leltarId, nev, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen hangszer' });
        const [updatedRow] = await pool.execute('SELECT * FROM hangszerek WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/hangszerek/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM hangszerek WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen hangszer' });
        res.json({ message: 'Hangszer törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Kategória CRUD műveletek
app.get('/api/kategoriak', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM kategoriak');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/kategoriak/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM kategoriak WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen kategória' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/kategoriak', async (req, res) => {
    try {
        const { katNev } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO kategoriak (katNev) VALUES (?)',
            [katNev]
        );
        const [newRow] = await pool.execute('SELECT * FROM kategoriak WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/kategoriak/:id', async (req, res) => {
    try {
        const { katNev } = req.body;
        const [result] = await pool.execute(
            'UPDATE kategoriak SET katNev = ? WHERE id = ?',
            [katNev, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen kategória' });
        const [updatedRow] = await pool.execute('SELECT * FROM kategoriak WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/kategoriak/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM kategoriak WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen kategória' });
        res.json({ message: 'Kategória törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Leltár CRUD műveletek
app.get('/api/leltarak', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM leltarak');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/leltarak/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM leltarak WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen leltár' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/leltarak', async (req, res) => {
    try {
        const { ar, elerhetoseg } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO leltarak (ar, elerhetoseg) VALUES (?, ?)',
            [ar, elerhetoseg]
        );
        const [newRow] = await pool.execute('SELECT * FROM leltarak WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/leltarak/:id', async (req, res) => {
    try {
        const { ar, elerhetoseg } = req.body;
        const [result] = await pool.execute(
            'UPDATE leltarak SET ar = ?, elerhetoseg = ? WHERE id = ?',
            [ar, elerhetoseg, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen leltár' });
        const [updatedRow] = await pool.execute('SELECT * FROM leltarak WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/leltarak/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM leltarak WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen leltár' });
        res.json({ message: 'Leltár törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Óra CRUD műveletek
app.get('/api/orak', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM orak');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orak/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM orak WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen óra' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orak', async (req, res) => {
    try {
        const { tanarId, diakId, tema } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO orak (tanarId, diakId, tema) VALUES (?, ?, ?)',
            [tanarId, diakId, tema]
        );
        const [newRow] = await pool.execute('SELECT * FROM orak WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/orak/:id', async (req, res) => {
    try {
        const { tanarId, diakId, tema } = req.body;
        const [result] = await pool.execute(
            'UPDATE orak SET tanarId = ?, diakId = ?, tema = ? WHERE id = ?',
            [tanarId, diakId, tema, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen óra' });
        const [updatedRow] = await pool.execute('SELECT * FROM orak WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/orak/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM orak WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen óra' });
        res.json({ message: 'Óra törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Kölcsönzés CRUD műveletek
app.get('/api/kolcsonzesek', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM kolcsonzesek');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/kolcsonzesek/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM kolcsonzesek WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen kölcsönzés' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/kolcsonzesek', async (req, res) => {
    try {
        const { hangszerId, diakId, kolcsKezd, kolcsVeg, megjegyzes } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsKezd, kolcsVeg, megjegyzes) VALUES (?, ?, ?, ?, ?)',
            [hangszerId, diakId, kolcsKezd, kolcsVeg, megjegyzes]
        );
        const [newRow] = await pool.execute('SELECT * FROM kolcsonzesek WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/kolcsonzesek/:id', async (req, res) => {
    try {
        const { hangszerId, diakId, kolcsKezd, kolcsVeg, megjegyzes } = req.body;
        const [result] = await pool.execute(
            'UPDATE kolcsonzesek SET hangszerId = ?, diakId = ?, kolcsKezd = ?, kolcsVeg = ?, megjegyzes = ? WHERE id = ?',
            [hangszerId, diakId, kolcsKezd, kolcsVeg, megjegyzes, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen kölcsönzés' });
        const [updatedRow] = await pool.execute('SELECT * FROM kolcsonzesek WHERE id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/kolcsonzesek/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM kolcsonzesek WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen kölcsönzés' });
        res.json({ message: 'Kölcsönzés törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Bejelentkezés és regisztráció
app.get('/api/bejelentkezesek', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bejelentkezesek');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/bejelentkezesek/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM bejelentkezesek WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nincs ilyen felhasználó' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/regisztracio', async (req, res) => {
    try {
        const { fnev, jelszo, jogosultsag, email } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES (?, ?, ?, ?)',
            [fnev, jelszo, jogosultsag, email]
        );
        const [newRow] = await pool.execute('SELECT * FROM bejelentkezesek WHERE id = ?', [result.insertId]);
        res.json(newRow[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/bejelentkezes', async (req, res) => {
    try {
        const { fnev, jelszo } = req.body;
        const [rows] = await pool.execute(
            'SELECT * FROM bejelentkezesek WHERE fnev = ? AND jelszo = ?',
            [fnev, jelszo]
        );
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó' });
        }
        res.json({ message: 'Sikeres bejelentkezés', user: rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/bejelentkezesek/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM bejelentkezesek WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen felhasználó' });
        res.json({ message: 'Felhasználó törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// KiMitTud CRUD műveletek
app.get('/api/kimittud', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM kimittud');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/kimittud', async (req, res) => {
    try {
        const { tanarId, hangszerId } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO kimittud (tanarId, hangszerId) VALUES (?, ?)',
            [tanarId, hangszerId]
        );
        res.json({ tanarId, hangszerId, message: 'Kapcsolat létrehozva' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/kimittud', async (req, res) => {
    try {
        const { tanarId, hangszerId } = req.body;
        const [result] = await pool.execute(
            'DELETE FROM kimittud WHERE tanarId = ? AND hangszerId = ?',
            [tanarId, hangszerId]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nincs ilyen kapcsolat' });
        res.json({ message: 'Kapcsolat törölve' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Szerver indítása
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Szerver fut: http://localhost:${PORT}`);
    });
});