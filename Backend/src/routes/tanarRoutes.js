const express = require('express');
const router = express.Router();
const tanarController = require('../controllers/tanarController');
const { protect } = require('../middleware/authMiddleware');

// Csak bejelentkezett felhasználók láthatják a tanárokat
router.get('/', protect, tanarController.getAllTanar);

module.exports = router;