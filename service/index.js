var express = require('express');
var router = express.Router();
const axios = require('axios');
const Sequelize=require('sequelize');
const sequelize=new Sequelize('sqlite://db.sqlite')
const Request=sequelize.define('request',{
  method:{
    type:Sequelize.STRING,
    allowNull:false      
  },
  url:{
    type:Sequelize.STRING,
    allowNull:false
  },
  response:{
    type:Sequelize.TEXT,
  },
  responseCode:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
},{})


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
    storeInDB(response,error,request)
  }
  catch (e){
    error=e;
  }
  res.json({response:response.data,error,request})
  res.render('index',{title:"Listonosz",response,error,request})
})
function storeInDB(response,error,request){
  Request.create({method:request.method,url:request.url,responseCode:response.status,response:JSON.stringify(response.data)}).then(()=>{
    sequelize.sync();
  })
}

module.exports = router;
