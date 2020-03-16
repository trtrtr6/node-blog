"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = require('../schemas/article');
const Article = mongoose_1.default.model('Article', articleSchema);
const articleModel = {
    count: option => {
        return Article.count(option);
    },
    save: ({ title, content, _user }) => {
        const article = new Article({ title, content, _user });
        return article.save();
    },
    delById: id => {
        return Article.deleteOne({ _id: id });
    },
    updateById: (id, { title, content }) => {
        const article = { title, content };
        return Article.findByIdAndUpdate({
            _id: id
        }, article);
    },
    findById: id => {
        return Article.findOne({ _id: id });
    },
    findOne: option => {
        return Article.findOne(option);
    },
    find: (option, page, size) => {
        return Article.find(option)
            .sort({ updateTime: -1 })
            .skip(size * (page - 1))
            .limit(size);
    }
};
module.exports = articleModel;
