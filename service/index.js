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
  console.log("Enter service");
  console.log(JSON.stringify(req.body))
  if (req.body.body){
    console.log("Contains data ",req.body.body);
  }
  req.body.data=req.body.body?JSON.parse(req.body.body):undefined
  let request={
    ...req.body,

  }
  console.log("Will request",request)
  let response;
  let error;
  let time;
  let length;
  let start=Date.now();
  try {
    response=await axios(request);
    time=Date.now()-start;
    length=response.data.length;
    storeInDB(response,error,request)
    response={body:response.data,headers:response.headers,status:response.status,statusText:response.statusText,time,length}
    res.json({response,request})
    console.log("RESPOMSE",response)
  }
  catch (error){
    console.log("In error")
    time=Date.now()-start;
    length=0;
    // console.log("XXX",error.response)
    if (error.response){
      let {headers,status,statusText}=error.response
      response={body:"",headers,status,statusText}
      res.json({response,request});
    }
    else {
      res.json({error:"ERROR!",response:{status:"BAD",statusText:"FAULT"}})
    }
    console.log("ERROR",response)
  }
  // console.log("RESP:",response,"ERR",error)
  // res.render('index',{title:"Listonosz",response,error,request})
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
