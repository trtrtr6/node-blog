/**
 * Created by xyy on 2017/3/5.
 */
var express = require('express');
var router = express.Router();
const mockModel = require('../models/Mock')
const constants = require('../utils/constants')
const pagination = require('../utils/pagination')

var responseData;

router.use(function (req, res, next) {
  responseData = Object.assign({}, constants.RES_INFO.success, { data: {} })
  next()
})

//新增一个mock接口
router.post('/add', async (req, res) => {
  const body = req.body
  const { name, path, type, reg } = body
  if (!(name && path && type && reg)) {
    responseData.data = '字段不能为空'
    res.json(responseData);
    return
  }
  const count = await mockModel.count({ path, type })
  if (count && count > 0) {
    responseData.data = '已存在对应的接口，添加失败'
    res.json(responseData);
    return
  }
  const doc = await mockModel.save({ name, path, type, reg })
  responseData.data = doc
  res.json(responseData);
})

//删除mock接口
router.get('/del/:id', async (req, res) => {
  const id = req.params.id
  await mockModel.delById(id)
  res.json(responseData);
})

//更新mock接口
router.post('/update/:id', async (req, res) => {
  const body = req.body
  const id = req.params.id
  const { name, path, type, reg } = body
  if (!(name && path && type && reg)) {
    responseData.data = '字段不能为空'
    res.json(responseData);
    return
  }
  await mockModel.updateById(id, { name, path, type, reg })
  res.json(responseData);
})

//查看mock接口详情
router.get('/info/:id', async (req, res) => {
  const id = req.params.id
  const doc = await mockModel.findById(id)
  responseData.data = doc
  res.json(responseData);
})

//查看mock接口列表
router.get('/list', async (req, res) => {
  const query = req.query
  const page = pagination.getPage(query.page)
  const size = pagination.getSize(query.size)
  try {
    const option = Object.keys(query).reduce((result, item) => {
      if (query[item] && item !== 'page' && item !== 'size') {
        result[item] = query[item]
      }
      return result
    }, {})
    const count = await mockModel.count(option)
    const list = await mockModel.find(option, page, size)
    responseData.data = {
      list,
      pagination: pagination.getPageInfo(count, page, size)
    }
    res.json(responseData);
  } catch (error) {
    responseData.data = error
    res.json(responseData);
  }
})


module.exports = router;