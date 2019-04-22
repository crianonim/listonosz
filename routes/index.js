var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Listonosz' });
});
router.post('/',async (req,res)=>{
  console.log("Got body",req.body)
  let response=await axios(req.body);
  res.render('index',{title:"Listonosz",response:JSON.stringify(response.data)})
})

module.exports = router;
