const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statisztikaController');

router.get('/nepszeru_hangszerek', statsController.getNepszeruHangszerek);
router.get('/tanarok_orai', statsController.getTanarokOrai);

module.exports = router;