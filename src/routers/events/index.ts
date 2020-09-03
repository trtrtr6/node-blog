import { Router, Request, Response } from 'express'
import eventsModel from '../../models/Events'
import { RES_INFO } from '../../utils/constants'
import pagination from '../../utils/pagination'
import LZString from 'lz-string'

const router: Router = Router()

let responseData

router.use((req: Request, res: Response, next) => {
  responseData = Object.assign({}, RES_INFO.SUCCESS, { data: {} })
  next()
})

//新增一个events数据
router.post('/add', async (req: Request, res: Response) => {
  const body = req.body
  let { system, username, events, sign } = body
  console.log('body=====', req.body)
  events = LZString.decompress(events)
  events = LZString.compressToBase64(events)
  if (sign) {
    const doc = await eventsModel.findOne({ sign })
    if (!doc) {
      const obj = { system, username, events: [events], sign }
      await eventsModel.save(obj)
    } else {
      const tempEvents = <string[]>doc.events
      tempEvents.push(events)
      await eventsModel.updateById(doc._id, { events: tempEvents })
    }
  } else {
    const obj = { system, username, events }
    await eventsModel.save(obj)
  }
  res.json(responseData)
})

//查看events详情
router.get('/info/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const doc = await eventsModel.findById(id)
  // doc.events = LZString.decompressFromBase64(doc.events)
  responseData.data = doc
  res.json(responseData)
})

//查看events列表
router.get('/list', async (req: Request, res: Response) => {
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
    const count = await eventsModel.count(option)
    const list = await eventsModel.find(option, page, size, '_id system username updateTime')
    responseData.data = {
      list,
      pagination: pagination.getPageInfo(count, page, size)
    }
  } catch (error) {
    responseData.data = error
  }
  res.json(responseData)
})

module.exports = router
