/**
 * Created by xyy on 2017/3/5.
 */
var mongoose = require('mongoose');
//用户结构表
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String
});
