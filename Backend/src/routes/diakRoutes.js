const express = require('express');
const router = express.Router();
const diakController = require('../controllers/diakController');
const { protect } = require('../middleware/authMiddleware'); // Ellenőrizd a w/W betűt!

// Csak bejelentkezett felhasználók láthatják a diákokat
router.get('/', protect, diakController.getAllDiak);

module.exports = router;