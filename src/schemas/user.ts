import { Schema } from 'mongoose'

//用户结构表
export default new Schema({
  //用户名
  username: String,
  //密码
  password: String
})
