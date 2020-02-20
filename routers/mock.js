/**
 * Created by xyy on 2017/3/5.
 */
var express = require('express');
var router = express.Router();
var Mock = require('../models/Mock');
const constants = require('../utils/constants')

var responseData;

router.use(function (req, res, next) {
  responseData = Object.assign({}, constants.RES_INFO.success, { data: {} })
  next()
})

//新增一个mock接口
router.post('/add', async (req, res) => {
  var body = req.body
  var mock = new Mock({
    name: body.name,
    path: body.path,
    type: body.type,
    reg: body.reg
  })
  const doc = await mock.save()
  responseData.data = doc
  res.json(responseData);
})
//查看mock接口详情
router.get('/info/:id', async (req, res) => {
  const id = req.params.id
  const doc = await Mock.findOne({
    _id: id
  })
  responseData.data = doc
  res.json(responseData);
})
//查看mock接口列表
router.get('/list', async (req, res) => {
  let list = await Mock.find().sort({ updateTime: -1 })
  responseData.data = {
    list
  }
  res.json(responseData);
})

module.exports = router;