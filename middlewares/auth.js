const jwtUtil = require('../utils/auth')
const RES_INFO = require('../utils/constants').RES_INFO
module.exports = {
  createToken: (user) => {
    const token = jwtUtil.createToken(user)
    return token
  },
  checkLogin: (req, res, next) => {
    //检查post的信息或者url查询参数或者头信息
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    const user = jwtUtil.checkToken(token)
    if (user) {
      console.log('-----user:', user)
      next()
    } else {
      res.json({
        code: RES_INFO.authError.code,
        msg: RES_INFO.authError.msg
      });
    }
  }
}