var express = require('express');
var router = express.Router();
var civil = require('../controllers/CIVILController');

/* GET users listing. */
router.get('/dept/CIVIL',civil.CIVIL);
router.get('/searchcivil/',civil.auto);
router.get('/searchci', civil.search);
router.get('/dept/CiVIL/:Operating_System/:mst1', civil.mst);


module.exports = router;
