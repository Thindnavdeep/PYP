var express = require('express');
var router = express.Router();
var cse = require('../controllers/CSEController.js');

/* GET users listing. */
router.get('/dept/CSE/', cse.CSE);
router.get('/searchcse/', cse.auto);
router.get('/searchcs/', cse.search);
// router.get('/dept/CSE/:Operating_System', cse.opt);-
router.get('/dept/CSE/:Operating_System/:mst1', cse.mst);

module.exports = router;
