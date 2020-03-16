import { Schema } from 'mongoose'

//文章结构表
export default new Schema(
  {
    //内容
    content: {
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
    //发表用户
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    //评论回复
    _responses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Response'
      }
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }
)
