import { Schema } from 'mongoose'

//用户结构表
export default new Schema(
  {
    system: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    events: {
      type: String,
      required: true
    },
    //创建时间
    createTime: {
      type: Date,
      default: Date.now
    },
    updateTime: {
      type: Date,
      default: Date.now
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }
)
