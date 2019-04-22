var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Listonosz' });
});
router.post('/',(req,res)=>{
  res.render('index',{title:"Listonosz",response:JSON.stringify(req.body)})
})

module.exports = router;
