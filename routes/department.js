var express = require('express');
var router = express.Router();
var deptname = require('../controllers/DepartmentController');

/* GET users listing. */
router.get('/dept',deptname.Deptlist);
router.get('/datta',deptname.whole)
module.exports = router;
