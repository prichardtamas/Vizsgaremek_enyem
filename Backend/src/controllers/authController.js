const pool = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { fnev, jelszo } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT id, fnev, jogosultsag, email FROM bejelentkezesek WHERE fnev = ? AND jelszo = ?',
            [fnev, jelszo]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó!' });
        }

        const user = rows[0];

        // Token generálása - a jogosultsagot 'role' néven rakjuk bele, hogy a middleware értse
        const token = jwt.sign(
            { id: user.id, fnev: user.fnev, role: user.jogosultsag },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Sikeres bejelentkezés!',
            user: { id: user.id, fnev: user.fnev, role: user.jogosultsag },
            token: token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};