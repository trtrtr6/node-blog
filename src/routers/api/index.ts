/**
 * Created by xyy on 2017/3/5.
 */
import { Router, Request, Response } from 'express'
import User from '../../models/User'
import Article from '../../models/ArticleNew'
import { RES_INFO } from '../../utils/constants'
import auth from '../../middlewares/auth'
import pagination from '../../utils/pagination'
import '../commonNote'

const router: Router = Router()

let responseData

router.use((req: Request, res: Response, next) => {
  responseData = Object.assign({}, RES_INFO.SUCCESS, { data: {} })
  next()
})

/**
 * 请求健康监测
 */
router.get('/user', (req: Request, res: Response) => {
  res.send('api-User.js')
})

// 参考 https://github.com/pgroot/express-swagger-generator

/**
 *  用户登录
 * @route POST /api/user/login
 * @group 登录 - 用户登录、登出、注册
 * @param {loginUser.model} body.body.required - 请输入用户名&密码
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/user/login', async (req: Request, res: Response) => {
  const username = req.body.username
  const password = req.body.password
  const userInfo = await User.findOne({
    username: username,
    password: password
  })
  console.log(userInfo)
  if (userInfo) {
    responseData.msg = '登录成功！'
    responseData.data.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    }
    // 老逻辑
    // req.cookies.set('userInfo', JSON.stringify(responseData.data.userInfo))
    // 新逻辑
    const token = auth.createToken({
      id: userInfo._id,
      username: userInfo.username
    })
    responseData.data.token = token
    res.json(responseData)
    return
  }
  responseData.code = RES_INFO.ERROR.code
  responseData.msg = '登录失败！'
  res.json(responseData)
})

/**
 *  用户注册
 * @route POST /api/user/register
 * @group 登录 - 用户登录、登出、注册
 * @param {loginUser.model} body.body.required - 请输入用户名&密码
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/user/register', (req: Request, res: Response) => {
  User.findOne({
    username: req.body.username
  })
    .then(function (userInfo) {
      console.log(userInfo)
      if (userInfo) {
        responseData.code = RES_INFO.ERROR.code
        responseData.msg = '用户已存在！'
        res.json(responseData)
        return
      } else {
        var username = req.body.username
        var password = req.body.password
        console.log(username)
        console.log(password)
        var user = new User({
          username: username,
          password: password
        })
        return user.save()
      }
    })
    .then(function (newUserInfo) {
      console.log(newUserInfo)
      responseData.msg = '注册成功！'
      responseData.data.userInfo = {
        _id: newUserInfo._id,
        username: newUserInfo.username
      }
      res.json(responseData)
    })
})
/**
 * 登出
 */
router.post('/user/loginout', (req: Request, res: Response) => {
  req.cookies.set('userInfo', null)
  res.json(responseData)
})

/**
 * 获取文章列表
 */
router.get('/list', async (req: Request, res: Response) => {
  const page = pagination.getPage(req.query.page)
  const size = pagination.getSize(req.query.size)
  const count = await Article.count({ del: { $ne: '0' } })
  const article_list = await Article.find({ del: { $ne: '0' } }, page, size)

  const list = article_list.map((item, index) => {
    const des = req.app.locals.markedes(item.content)
    item = item.toObject() // 将文档对象转成object对象
    delete item.content
    item.summary = des
    return item
  })
  responseData.data = {
    // userInfo: req.userInfo,
    article_list: list,
    pagination: pagination.getPageInfo(count, page, size)
  }
  res.json(responseData)
})
/**
 * 根据id获取文章详情
 */
router.get('/detail/:id', auth.checkLogin, async (req: Request, res: Response) => {
  const id = req.params.id
  const article = await Article.findById(id)
  responseData.data = {
    // userInfo: req.userInfo,
    article: article
  }
  res.json(responseData)
}
)

module.exports = router
