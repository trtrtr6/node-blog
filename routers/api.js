/**
 * Created by xyy on 2017/3/5.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');

var responseData;

router.use(function(req,res,next){
    responseData = {
        code:0,
        msg:'',
        data:{}
    };
    next();
});

router.get('/user',function(req,res){
    res.send('api-User.js');
});

router.post('/user/login',function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        console.log(userInfo);
        if(userInfo){
            responseData.msg = '登录成功！';
            responseData.data.userInfo = {
                _id:userInfo._id,
                username:userInfo.username
            };
            req.cookies.set('userInfo',JSON.stringify(responseData.data.userInfo));
            res.json(responseData);
            return;
        }
        responseData.code = '1'
        responseData.msg = '登录失败！';
        res.json(responseData);
    });
})

router.post('/user/register',function (req,res) {

    User.findOne({
        username:req.body.username
    }).then(function(userInfo){
        console.log(userInfo);
        if(userInfo){
            responseData.code = 1;
            responseData.msg = '用户已存在！';
            res.json(responseData);
            return;
        }else{
            var username = req.body.username;
            var password = req.body.password;
            console.log(username);
            console.log(password);
            var user = new User({
                username:username,
                password:password
            })
            return user.save();
        }
    }).then(function(newUserInfo){
        console.log(newUserInfo);
        responseData.msg = "注册成功！";
        responseData.data.userInfo = {
            _id:newUserInfo._id,
            username:newUserInfo.username
        };;
        res.json(responseData);
    });

})

router.post('/user/loginout',function (req,res) {
    req.cookies.set("userInfo",null);
    res.json(responseData);
})

/**
 * 获取文章列表
 */
router.get('/list',function(req,res,next){
    Article.find().populate('_user','username _id').sort({_id: -1}).exec(function(err,article_list) {
        responseData.data={
            userInfo:req.userInfo,
            article_list:article_list
        }
        res.json(responseData);
    });
})

module.exports = router;