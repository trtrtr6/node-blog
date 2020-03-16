"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by xyy on 2017/9/10.
 */
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
//文章结构表
module.exports = new mongoose_1.default.Schema({
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
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});
