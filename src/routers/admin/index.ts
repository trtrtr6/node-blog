/**
 * Created by xyy on 2017/3/5.
 * 后台业务逻辑处理
 */
import express from "express";
import adminModel from "../../models/Admin";
import { RES_INFO } from "../../utils/constants";
import auth from "../../middlewares/auth";
import pagination from "../../utils/pagination";

const router = express.Router();

let responseData;

router.use((req, res, next) => {
  responseData = Object.assign({}, RES_INFO.SUCCESS, { data: {} });
  next();
});

router.get("/", function (req, res, next) {
  res.render("admin/index");
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userInfo = await adminModel.findOne({
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
    // 新逻辑
    const token = auth.createToken({
      id: userInfo._id,
      username: userInfo.username,
    });
    responseData.data.token = token;
  } else {
    responseData.code = RES_INFO.ERROR.code;
    responseData.msg = "登录失败！";
  }
  res.json(responseData);
});

router.get("/info", auth.checkLogin, async (req, res) => {
  const admin = res.locals.admin;
  responseData.data = {
    roles: ["admin"],
    username: admin.username,
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    id: admin._id,
  };
  res.json(responseData);
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  const doc = await adminModel.findOne({ username });
  if (doc) {
    responseData.code = RES_INFO.ERROR.code;
    responseData.msg = "用户已存在！";
  } else {
    const admin = await adminModel.save({ username, password });
    responseData.data = admin;
    responseData.msg = "注册成功！";
  }
  res.json(responseData);
});

module.exports = router;
