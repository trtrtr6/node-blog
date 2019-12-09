/**
 * Created by xyy on 2017/3/5.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
const constants = require('../utils/constants')
const auth = require('../middlewares/auth')

var responseData;

router.use(function (req, res, next) {
  responseData = {
    code: constants.RES_INFO.code,
    msg: constants.RES_INFO.msg,
    data: {}
  };
  next()
})

router.get('/user', function (req, res) {
  res.send('api-User.js');
});

router.post('/user/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log('body', req.body);
  console.log('username', username);
  console.log('password', password);
  User.findOne({
    username: username,
    password: password
  }).then(function (userInfo) {
    console.log(userInfo);
    if (userInfo) {
      responseData.msg = '登录成功！';
      responseData.data.userInfo = {
        _id: userInfo._id,
        username: userInfo.username
      };
      // 老逻辑
      req.cookies.set('userInfo', JSON.stringify(responseData.data.userInfo));
      // 新逻辑
      const token = auth.createToken({ id: userInfo._id, username: userInfo.username })
      responseData.data.token = token
      res.json(responseData);
      return;
    }
    responseData.code = '1'
    responseData.msg = '登录失败！';
    res.json(responseData);
  });
})

router.post('/user/register', function (req, res) {

  User.findOne({
    username: req.body.username
  }).then(function (userInfo) {
    console.log(userInfo);
    if (userInfo) {
      responseData.code = 1;
      responseData.msg = '用户已存在！';
      res.json(responseData);
      return;
    } else {
      var username = req.body.username;
      var password = req.body.password;
      console.log(username);
      console.log(password);
      var user = new User({
        username: username,
        password: password
      })
      return user.save();
    }
  }).then(function (newUserInfo) {
    console.log(newUserInfo);
    responseData.msg = "注册成功！";
    responseData.data.userInfo = {
      _id: newUserInfo._id,
      username: newUserInfo.username
    };;
    res.json(responseData);
  });

})

router.post('/user/loginout', function (req, res) {
  req.cookies.set("userInfo", null);
  res.json(responseData);
})

/**
 * 获取文章列表
 */
router.get('/list', async (req, res) => {
  let article_list = await Article.find({ del: { $ne: '0' } }, { del: 0, _comments: 0 }).populate('_user', 'username _id').sort({ _id: -1 })
  const list = article_list.map((item, index) => {
    const des = req.app.locals.markedes(item.content)
    item = item.toObject() // 将文档对象转成object对象
    delete item.content
    item.summary = des
    return item
  })
  responseData.data = {
    userInfo: req.userInfo,
    article_list: list
  }
  res.json(responseData);
})
/**
 * 根据id获取文章详情
 */
router.get('/detail/:id', auth.checkLogin, async (req, res) => {
  const id = req.params.id
  const article = await Article.findOne({
    _id: id
  }, { del: 0 }).populate('_user', 'username _id').populate({
    path: '_comments',
    options: { sort: { _id: -1 } },
    populate: [{
      path: '_user',
      select: 'username _id'
    }, {
      path: '_responses',
      populate: {
        path: '_user',
        select: 'username _id'
      }
    }]
  })
  res.json({
    userInfo: req.userInfo,
    article: article
  })
})

module.exports = router;