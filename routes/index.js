var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/team',(req,res)=>{
  res.render("team");
})

module.exports = router;
