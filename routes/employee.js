const express = require('express');

const router = express.Router();

const path = require('path');

const empployeeController = require('../controllers/employee');

router.get('/addemploy', empployeeController.addEmploy);

router.post('/postemploy', empployeeController.postEmploy);

router.get('/employee', empployeeController.emplpoyee);

router.get('/editemployee', empployeeController.editEmployee);

router.post('/postEditemploy', empployeeController.postEditEmploy);

router.get('/delEmp', empployeeController.delEmploy);

router.get('/sortEmp', empployeeController.sortEmploy);

module.exports = router;