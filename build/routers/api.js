"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by xyy on 2017/3/5.
 */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User = require('../models/User');
var Article = require('../models/Article');
const constants_1 = require("../utils/constants");
const auth = require('../middlewares/auth');
const pagination = require('../utils/pagination');
var responseData;
router.use(function (req, res, next) {
    responseData = Object.assign({}, constants_1.RES_INFO.SUCCESS, { data: {} });
    next();
});
router.get('/user', function (req, res) {
    res.send('api-User.js');
});
router.post('/user/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
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
            const token = auth.createToken({
                id: userInfo._id,
                username: userInfo.username
            });
            responseData.data.token = token;
            res.json(responseData);
            return;
        }
        responseData.code = constants_1.RES_INFO.ERROR.code;
        responseData.msg = '登录失败！';
        res.json(responseData);
    });
});
router.post('/user/register', function (req, res) {
    User.findOne({
        username: req.body.username
    })
        .then(function (userInfo) {
        console.log(userInfo);
        if (userInfo) {
            responseData.code = constants_1.RES_INFO.ERROR.code;
            responseData.msg = '用户已存在！';
            res.json(responseData);
            return;
        }
        else {
            var username = req.body.username;
            var password = req.body.password;
            console.log(username);
            console.log(password);
            var user = new User({
                username: username,
                password: password
            });
            return user.save();
        }
    })
        .then(function (newUserInfo) {
        console.log(newUserInfo);
        responseData.msg = '注册成功！';
        responseData.data.userInfo = {
            _id: newUserInfo._id,
            username: newUserInfo.username
        };
        res.json(responseData);
    });
});
router.post('/user/loginout', function (req, res) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
});
/**
 * 获取文章列表
 */
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const count = yield Article.count({ del: { $ne: '0' } });
    const article_list = yield Article.find({ del: { $ne: '0' } }, { del: 0, _comments: 0 })
        .populate('_user', 'username _id')
        .sort({ _id: -1 })
        .skip(size * (page - 1))
        .limit(size);
    const list = article_list.map((item, index) => {
        const des = req.app.locals.markedes(item.content);
        item = item.toObject(); // 将文档对象转成object对象
        delete item.content;
        item.summary = des;
        return item;
    });
    responseData.data = {
        // userInfo: req.userInfo,
        article_list: list,
        pagination: pagination.getPageInfo(count, page, size)
    };
    res.json(responseData);
}));
/**
 * 根据id获取文章详情
 */
router.get('/detail/:id', auth.checkLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const article = yield Article.findOne({
        _id: id
    }, { del: 0 })
        .populate('_user', 'username _id')
        .populate({
        path: '_comments',
        options: { sort: { _id: -1 } },
        populate: [
            {
                path: '_user',
                select: 'username _id'
            },
            {
                path: '_responses',
                populate: {
                    path: '_user',
                    select: 'username _id'
                }
            }
        ]
    });
    responseData.data = {
        // userInfo: req.userInfo,
        article: article
    };
    res.json(responseData);
}));
module.exports = router;
