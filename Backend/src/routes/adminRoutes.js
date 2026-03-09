const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/tablak/:tabla/szerkezet', adminController.getTablaSzerkezet);
router.post('/tablak/:tabla', adminController.createRekord);
router.put('/tablak/:tabla/:id', adminController.updateRekord);
router.delete('/tablak/:tabla/:id', adminController.deleteRekord);

module.exports = router;