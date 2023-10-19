var express = require('express');
var router = express.Router();
var ece = require('../controllers/ECEController');

/* GET users listing. */
router.get('/dept/ECE',ece.ECE);
router.get('/searchece/',ece.auto);    
router.get('/searchec', ece.search);
router.get('/dept/ECE/:Operating_System/:mst1', ece.mst);

module.exports = router;
