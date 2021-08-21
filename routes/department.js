const express = require('express');

const router = express.Router();

const path = require('path');

const departController = require('../controllers/department');

router.get('/adddepart', departController.addDepart);

router.post('/postdepart', departController.postDepart);

router.get('/department', departController.department);

router.get('/delDept', departController.delDepart);

router.get('/sortDept', departController.sortDepart);

module.exports = router;