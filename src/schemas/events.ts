import { Schema } from 'mongoose'

//用户结构表
export default new Schema(
  {
    sign: { // 标识event是同一个录制
      type: String
    },
    system: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    events: {
      type: Schema.Types.Mixed,
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
