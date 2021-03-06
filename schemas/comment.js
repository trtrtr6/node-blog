/**
 * Created by xyy on 2017/9/10.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//文章结构表
module.exports = new mongoose.Schema({
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
    _responses:[{
        type: Schema.Types.ObjectId,
        ref: 'Response'
    }]
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});