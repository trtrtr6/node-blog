
/**
 * Created by xyy on 2017/3/5.
 */

const express = require('express');
const ejs = require('ejs');
//加载数据库模块
const mongoose = require('mongoose');
//用来处理post提交的数据
const bodyParse = require('body-parser');
//加载cookies模块
const cookies = require('cookies');
//日志处理
var logger = require('morgan');
//路由
const routers = require('./routers');
//全局变量以及方法
const locals = require('./utils/locals');
//加载配置
const config = require('config');
const app = express();

//加载全局变量以及方法
locals(app);

app.use('/public', express.static(__dirname + '/public'));

///////// 自定义logger输出 /////////
// 自定义token
logger.token('from', function (req, res) {
  return JSON.stringify(req.query) || '-';
});

logger.token('time', function (req, res) {
  return app.locals.dateFormat(new Date())
});

logger.token('nextROw', function (req, res) {
  return "\r\n";
});

// 自定义format，其中包含自定义的token
logger.format('joke', '[joke] :time :remote-addr :remote-user :method :url :from :status :referrer :response-time ms :user-agent :nextROw');

app.use(logger('joke'));
///////// 自定义logger输出 /////////

app.engine('html', ejs.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
app.set('view cache', false);

//bodyParse设置
app.use(bodyParse.urlencoded({ extended: true }));

//cookies设置
app.use(function (req, res, next) {
  req.cookies = new cookies(req, res);
  req.userInfo = {};
  //获取用户登录信息
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
    } catch (e) { }
  }
  next();
});

// 添加模板必需的登录用户变量
app.use(function (req, res, next) {
  res.locals.user = req.userInfo;
  next();
});


routers(app);

mongoose.Promise = global.Promise;
var mongodb_config = config.get('dbConfig.mongodb');
mongoose.connect(mongodb_config, function (err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功');
    const port = process.env.PORT || 5000
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
  }
});