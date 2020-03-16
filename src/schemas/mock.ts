import { Schema } from 'mongoose'

//用户结构表
export default new Schema(
  {
    //用户名
    name: String,
    //密码
    path: String,
    //请求类型
    type: String,
    //规则对象
    reg: Schema.Types.Mixed
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }
)
