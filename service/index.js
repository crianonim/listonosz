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
  headers:{
    type:Sequelize.TEXT,
  },
  body:{
    type:Sequelize.TEXT,
  },
  
},{})


router.post('/',async (req,res)=>{
  console.log("Enter service endpoint. Received "+JSON.stringify(req.body))
  let {url,method="get",body=null,bodyType="none"}=req.body;
  let config={
    url,
    method,
    validateStatus:null,// we want no Errors on responds
  }
  if (body && bodyType && bodyType!="none"){
    console.log("Setting data to :"+body)
    // if (bodyType=="json"){
    //   console.log("Parse with JSON");
    
    // }
    config.data=body;
  }
  
  console.log("Will request",config);


  
  let response;
  let time;
  let length;
  let start=Date.now();
  try {
    response=await axios(config);
    time=Date.now()-start;
    let {data:body,headers,status,statusText}=response;
    length=JSON.stringify(body).length;
    let responseObj={
      body, headers, status, statusText, request:config, length,time
    }
    console.log("Will send back",responseObj);
//    storeInDB(response,error,config)
    res.json(responseObj)
    console.log("Success")
  }
  catch (error){
    console.log("In error",error)
    res.sendStatus(500);
  }
})
router.get('/',(req,res)=>{
  let limit=req.query.limit||100;
  Request.findAll({limit,order:[['id','DESC']]}).then(result=>{
    res.json(result);

  });
})
function storeInDB(response,error,request){
  sequelize.sync();
  Request.create({method:request.method,url:request.url,body:request.body,headers:JSON.stringify(request.headers)}).then(()=>{
    sequelize.sync();
  })
}

module.exports = router;
