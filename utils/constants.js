// res返回信息常量
const RES_INFO = {
  success: {
    code: 1,
    msg: '成功'
  },
  error: {
    code: 0,
    msg: '请求异常'
  },
  authError: {
    code: 401,
    msg: '请先登录'
  }
}

module.exports = {
  RES_INFO
}