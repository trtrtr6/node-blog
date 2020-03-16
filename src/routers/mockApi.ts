import express from 'express'
const router = express.Router()
const mockModel = require('../models/Mock')
const constants = require('../utils/constants')
const Mockjs = require('mockjs')

// 不用我们自己遍历处理。mock支持整个对象的mock
const MockData = obj => {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (typeof val === 'object') {
        if (val.mock) {
          const cls = val.class
          if (cls === 'array') {
            const custom = val.custom
            const reg = val.reg
            let i = 0
            const arr = []
            while (i < reg) {
              i++
              arr.push(MockData({ ...custom }))
            }
            obj[key] = arr
          } else if (cls === 'image') {
            obj[key] = Mockjs.Random.image(...val.reg)
          }
        } else {
          MockData(val)
        }
      } else {
        obj[key] = Mockjs.mock(val)
      }
    })
  }
  return obj
}

let responseData

router.use(function(req, res, next) {
  responseData = Object.assign({}, constants.RES_INFO.success, { data: {} })
  next()
})

router.use('/', async (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  const method = req.method
  const path = req.path
  const doc = await mockModel.findOne({
    path,
    type: { $regex: method, $options: '$i' } // 忽略大小写
  })
  if (doc && doc.reg) {
    responseData.data = Mockjs.mock(doc.reg)
  }
  res.json(responseData)
})

module.exports = router
