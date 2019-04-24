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
  console.log("Enter service");
  console.log(JSON.stringify(req.body))
  if (req.body.data){
    console.log("Contains data ",req.body.data);
    console.log("DATA"+req.body.data)
  }
  req.body.data=req.body.data?JSON.parse(req.body.data):undefined
  let request={
    ...req.body,
  }
  console.log("Will request",request)
  let response;
  let error;
  try {
    response=await axios(request);
    storeInDB(response,error,request)
  }
  catch (e){
    error=e;
  }
  response={body:response.data,headers:response.headers,status:response.status,statusText:response.statusText}
  res.json({response:response,error,request})
  // res.render('index',{title:"Listonosz",response,error,request})
})
function storeInDB(response,error,request){
  Request.create({method:request.method,url:request.url,responseCode:response.status,response:JSON.stringify(response.data)}).then(()=>{
    sequelize.sync();
  })
}

module.exports = router;
