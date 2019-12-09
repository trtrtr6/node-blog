/**
 * Created by xyy on 2017/3/19.
 */
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig')

module.exports = {
  createToken: (user) => {
    var token = jwt.sign(user, jwtConfig.secret, {
      'expiresIn': jwtConfig.expiresInMinutes
    });
    return token;
  },
  checkToken: (token) => {
    console.log('检查post的信息或者url查询参数或者头信息', token);
    // 解析 token
    if (token) {
      // 确认token
      try {
        const decoded = jwt.verify(token, jwtConfig.secret)
        return decoded
      } catch (error) {
        console.error(error)
      }
    }
    // 如果没有token或者token过期等，则返回错误
    return false
  }
}