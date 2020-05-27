/**
 * Created by xyy on 2017/3/5.
 */

import express from 'express'
import ejs from 'ejs'
//加载数据库模块
import mongoose from 'mongoose'
//用来处理post提交的数据
import bodyParse from 'body-parser'
//加载cookies模块
const cookies = require('cookies')
//日志处理
const logger = require('morgan')
//gzip
import compression from 'compression'
//路由
import routers from './routers'
//全局变量以及方法
const locals = require('./utils/locals')
//加载配置
import config from 'config'
const app = express()

app.use(compression())

//加载全局变量以及方法
locals(app)

app.use('/public', express.static(__dirname + '/public'))

///////// 自定义logger输出 /////////
logger.token('time', function (req, res) {
  return app.locals.dateFormat(new Date())
})

logger.token('nextROw', function (req, res) {
  return '\r\n'
})

// 自定义format，其中包含自定义的token
logger.format(
  'joke',
  '[joke] :time :remote-addr :remote-user :method :url :status :referrer :response-time ms :user-agent :nextROw'
)

app.use(logger('joke'))
///////// 自定义logger输出 /////////

app.engine('html', ejs.renderFile)
app.set('views', './views')
app.set('view engine', 'html')
//在开发过程中，需要取消模板缓存
app.set('view cache', false)

//bodyParse设置
//解析 application/json
app.use(bodyParse.json({ limit: '50mb' }))
//解析 application/x-www-form-urlencoded
app.use(bodyParse.urlencoded({ limit: '50mb', extended: true }))

// //cookies设置
// app.use(function(req, res, next) {
//   req.cookies = new cookies(req, res)
//   req.userInfo = {}
//   //获取用户登录信息
//   if (req.cookies.get('userInfo')) {
//     try {
//       req.userInfo = JSON.parse(req.cookies.get('userInfo'))
//     } catch (e) {}
//   }
//   next()
// })

// 添加模板必需的登录用户变量
// app.use(function(req, res, next) {
//   res.locals.user = req.userInfo
//   next()
// })

routers(app)

// mongoose.Promise = global.Promise
const mongodb_config: string = config.get('dbConfig.mongodb')
mongoose.connect(
  mongodb_config,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log('数据库连接失败')
    } else {
      console.log('数据库连接成功')
      const port = process.env.PORT || 5000
      app.listen(port, () =>
        console.log(`Listening at http://localhost:${port}`)
      )
    }
  }
)