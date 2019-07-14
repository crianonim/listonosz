var express = require('express');
var router = express.Router();
const qs=require('querystring');
const axios = require('axios');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite://db.sqlite')
const Request = sequelize.define('request', {
  method: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  params:{
    type: Sequelize.TEXT,
  },
  headers: {
    type: Sequelize.TEXT,
  },
  body: {
    type: Sequelize.TEXT,
  },
  bodyType: {
    type: Sequelize.STRING
  },
  bookMarked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }

}, {})

sequelize.sync();


router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  console.log("TO DEL", id);
  Request.destroy({ where: { id } }).then((result) => {
    return res.json(result);
  })
})
router.put('/bookmark/:id', async (req, res) => {
  let id = req.params.id;
  console.log("TO BOOMARK", id);
  Request.update({ bookMarked: true }, { where: { id } }).then((result) => {
    return res.json(result);
  })
})
router.put('/unmark/:id', async (req, res) => {
  let id = req.params.id;
  console.log("TO BOOMARK", id);
  Request.update({ bookMarked: false }, { where: { id } }).then((result) => {
    return res.json(result);
  })
})

router.post('/', async (req, res) => {
  console.log("Enter service endpoint. Received " + JSON.stringify(req.body))
  let { url, method = "get", body = null, bodyType = "none", requestId = 0, headers } = req.body;
  let requestConfig = {
    url,
    method,
    requestId,
    headers,
    validateStatus: null,// we want no Errors on responds
  }
  let bodyToStore = body;
  if (body && bodyType && bodyType != "none") {
    console.log("Setting data to :" + body)
    if (bodyType == "raw") {
      try {
        body = JSON.parse(body)
      }
      catch (e) {
        console.log("Couldn't parse, left alone", body)
      }
    }
    requestConfig.data = body;
  }
  let toStore = {
    url,
    method,
    headers,
    body: bodyToStore,
    bodyType,
    
  }
  console.log("Will request", requestConfig);

  try {
    let start = Date.now();
    let response = await axios(requestConfig);
    let time = Date.now() - start;
    let { data: body, headers, status, statusText } = response;
    let length = JSON.stringify(body).length;
    let responseObj = {
      body, headers, status, statusText, request: requestConfig, requestId, length, time
    }
    console.log("Will send back", responseObj);

    
    toStore.params=Object.entries(qs.parse(toStore.url.replace(/^.*\?/,'')));
    console.log("Wants to store", toStore);
    storeInDB(toStore)
    res.json(responseObj)
    console.log("Success")
  }
  catch (error) {
    console.log("In error", error)
    res.sendStatus(500);
  }
})

router.get('/', (req, res) => {
  let limit = req.query.limit || 100;
  Request.findAll({ limit, order: [['id', 'DESC']] }).then(result => {
    res.json(result);

  });
})
function storeInDB(request) {
  sequelize.sync();
  let objToStore = {
    method: request.method,
    url: request.url.replace(/\?.*$/,''),
    body: request.body,
    bodyType: request.bodyType,
    params: JSON.stringify(request.params),
    headers: JSON.stringify(request.headers)
  };
  console.log("OBJ to store", objToStore);
  Request.create(objToStore
  ).then(() => {
    sequelize.sync();
  })
}

module.exports = router;
