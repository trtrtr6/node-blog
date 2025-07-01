/**
 * Created by xyy on 2017/3/5.
 */
import express from "express";
import User from "../../models/User";
import Article from "../../models/ArticleNew";
import { RES_INFO } from "../../utils/constants";
import auth from "../../middlewares/auth";
import pagination from "../../utils/pagination";

const router = express.Router();

let responseData;

router.use((req, res, next) => {
  responseData = Object.assign({}, RES_INFO.SUCCESS, { data: {} });
  next();
});

/**
 * 请求健康监测
 * @route GET /api/user
 * @group 系统 - 系统相关接口
 * @returns {string} 200 - 健康检查响应
 */
router.get("/user", (req, res) => {
  res.send("api-User.js");
});

// 参考 https://github.com/pgroot/express-swagger-generator

/**
 *  用户登录
 * @route POST /api/user/login
 * @group 登录 - 用户登录、登出、注册
 * @param {VoLoginUser.model} body.body.required - 请输入用户名&密码
 * @returns {ResCommon.model} 200 - 登录成功的信息
 * @returns {ResErrorCommon.model}  default - 登录失败的信息
 */
router.post("/user/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userInfo = await User.findOne({
    username: username,
    password: password,
  });
  console.log(userInfo);
  if (userInfo) {
    responseData.msg = "登录成功！";
    responseData.data.userInfo = {
      _id: userInfo._id,
      username: userInfo.username,
    };
    // 老逻辑
    // req.cookies.set('userInfo', JSON.stringify(responseData.data.userInfo))
    // 新逻辑
    const token = auth.createToken({
      id: userInfo._id,
      username: userInfo.username,
    });
    responseData.data.token = token;
    res.json(responseData);
    return;
  }
  responseData.code = RES_INFO.ERROR.code;
  responseData.msg = "登录失败！";
  res.json(responseData);
});

/**
 *  用户注册
 * @route POST /api/user/register
 * @group 登录 - 用户登录、登出、注册
 * @param {VoLoginUser.model} body.body.required - 请输入用户名&密码
 * @returns {ResCommon.model} 200 - 注册成功的信息
 * @returns {ResErrorCommon.model}  default - 注册失败的信息
 */
router.post("/user/register", (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then(function (userInfo) {
      console.log(userInfo);
      if (userInfo) {
        responseData.code = RES_INFO.ERROR.code;
        responseData.msg = "用户已存在！";
        res.json(responseData);
        return;
      } else {
        var username = req.body.username;
        var password = req.body.password;
        console.log(username);
        console.log(password);
        var user = new User({
          username: username,
          password: password,
        });
        return user.save();
      }
    })
    .then(function (newUserInfo) {
      console.log(newUserInfo);
      responseData.msg = "注册成功！";
      responseData.data.userInfo = {
        _id: newUserInfo._id,
        username: newUserInfo.username,
      };
      res.json(responseData);
    });
});
/**
 * 用户登出
 * @route POST /api/user/loginout
 * @group 登录 - 用户登录、登出、注册
 * @returns {ResCommon.model} 200 - 登出成功的信息
 * @returns {ResErrorCommon.model}  default - 登出失败的信息
 */
router.post("/user/loginout", (req, res) => {
  req.cookies.set("userInfo", null);
  res.json(responseData);
});

/**
 * 获取文章列表
 * @route GET /api/list
 * @group 文章 - 文章相关接口
 * @param {number} page.query - 页码 - eg: 1
 * @param {number} size.query - 每页数量 - eg: 10
 * @returns {ResArticleList.model} 200 - 获取文章列表成功
 * @returns {ResErrorCommon.model}  default - 获取文章列表失败
 */
router.get("/list", async (req, res) => {
  const page = pagination.getPage(req.query.page as string);
  const size = pagination.getSize(req.query.size as string);
  const count = await Article.count({ del: { $ne: "0" } });
  const article_list = await Article.find({ del: { $ne: "0" } }, page, size);

  const list = article_list.map((item, index) => {
    const des = req.app.locals.markedes(item.content);
    item = item.toObject() as unknown as any; // 将文档对象转成object对象
    delete item.content;
    item.summary = des;
    return item;
  });
  responseData.data = {
    // userInfo: req.userInfo,
    article_list: list,
    pagination: pagination.getPageInfo(count, page, size),
  };
  res.json(responseData);
});
/**
 * 根据id获取文章详情
 * @route GET /api/detail/{id}
 * @group 文章 - 文章相关接口
 * @param {string} id.path.required - 文章ID - eg: 507f1f77bcf86cd799439011
 * @returns {ResArticleDetail.model} 200 - 获取文章详情成功
 * @returns {ResErrorCommon.model}  default - 获取文章详情失败
 * @security JWT
 */
router.get("/detail/:id", auth.checkLogin, async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  responseData.data = {
    // userInfo: req.userInfo,
    article: article,
  };
  res.json(responseData);
});

module.exports = router;
