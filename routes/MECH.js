var express = require('express');
var router = express.Router();
var mech = require('../controllers/MECHController');

/* GET users listing. */
router.get('/dept/MECH',mech.MECH);
router.get('/searchmech/',mech.auto);   
router.get('/searchme', mech.search);
router.get('/dept/MECH/:subject/:paper', mech.mst);


module.exports = router;
