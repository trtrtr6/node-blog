"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//用户结构表
module.exports = new mongoose_1.default.Schema({
    //用户名
    name: String,
    //密码
    path: String,
    //请求类型
    type: String,
    //规则对象
    reg: mongoose_1.default.Schema.Types.Mixed
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});
