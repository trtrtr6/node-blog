"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var mockSchema = require('../schemas/mock');
const Mock = mongoose_1.default.model('Mock', mockSchema);
const mockModel = {
    count: option => {
        return Mock.count(option);
    },
    save: ({ name, path, type, reg }) => {
        const mock = new Mock({ name, path, type, reg });
        return mock.save();
    },
    delById: id => {
        return Mock.deleteOne({
            _id: id
        });
    },
    updateById: (id, { name, path, type, reg }) => {
        const mock = { name, path, type, reg };
        return Mock.findByIdAndUpdate({
            _id: id
        }, mock);
    },
    findById: id => {
        return Mock.findOne({
            _id: id
        });
    },
    findOne: option => {
        return Mock.findOne(option);
    },
    find: (option, page, size) => {
        return Mock.find(option)
            .sort({ updateTime: -1 })
            .skip(size * (page - 1))
            .limit(size);
    }
};
module.exports = mockModel;
