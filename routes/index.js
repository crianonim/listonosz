var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Listonosz' });
});
router.post('/',async (req,res)=>{
  console.log("DATA"+req.body.data)
  req.body.data=req.body.data?JSON.parse(req.body.data):''
  let request={
    ...req.body,
  }
  console.log("WIll request",request)
  let response;
  let error;
  try {
    response=await axios(request);
  }
  catch (e){
    error=e;
  }
  res.render('index',{title:"Listonosz",response,error,request})
})

module.exports = router;
