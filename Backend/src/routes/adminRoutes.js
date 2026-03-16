const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Végpontok definíciója az adminApi.js alapján
router.get('/tablak', adminController.getTables);
router.get('/tablak/:table/szerkezet', adminController.getTableStructure);
router.get('/tablak/:table/adatok', adminController.getTableData);
router.post('/tablak/:table', adminController.createRecord);
router.put('/tablak/:table/:id', adminController.updateRecord);
router.delete('/tablak/:table/:id', adminController.deleteRecord);

module.exports = router;