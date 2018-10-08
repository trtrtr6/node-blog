/**
 * Created by xyy on 2017/9/10.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//文章结构表
module.exports = new mongoose.Schema({
    //标题
    title: {
        type: String,
        required: true
    },
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
    //评论
    _comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    del: {
        type: String,
        default: '1'
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});