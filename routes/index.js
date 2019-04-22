var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Listonosz' });
});
router.post('/',async (req,res)=>{
  console.log("Got body",req.body)
  let request={
    ...req.body,
  }
  let response;
  let error;
  try {
    let response=await axios(request);
  }
  catch (e){
    error=e;
  }
  res.render('index',{title:"Listonosz",response,error,request})
})

module.exports = router;
