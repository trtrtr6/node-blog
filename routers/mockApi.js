var express = require('express');
var router = express.Router();
const constants = require('../utils/constants')

var responseData;

router.use(function (req, res, next) {
  responseData = Object.assign({}, constants.RES_INFO.success, { data: {} })
  next()
})

router.use('/', async (req, res, next) => {
  console.log(11111)
  console.log(responseData)
  res.json(responseData);
  // next()
})

module.exports = router;