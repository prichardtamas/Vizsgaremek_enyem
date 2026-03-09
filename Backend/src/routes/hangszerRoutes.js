const express = require('express');
const router = express.Router();
const hangszerController = require('../controllers/hangszerController');

router.get('/', hangszerController.getHangszerek);
router.get('/elerheto', hangszerController.getElerhetoHangszerek);
router.get('/kategoriak', hangszerController.getKategoriak);

module.exports = router;