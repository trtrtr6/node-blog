"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mockModel = require('../models/Mock');
const constants = require('../utils/constants');
const Mockjs = require('mockjs');
// 不用我们自己遍历处理。mock支持整个对象的mock
const MockData = obj => {
    if (typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            const val = obj[key];
            if (typeof val === 'object') {
                if (val.mock) {
                    const cls = val.class;
                    if (cls === 'array') {
                        const custom = val.custom;
                        const reg = val.reg;
                        let i = 0;
                        const arr = [];
                        while (i < reg) {
                            i++;
                            arr.push(MockData(Object.assign({}, custom)));
                        }
                        obj[key] = arr;
                    }
                    else if (cls === 'image') {
                        obj[key] = Mockjs.Random.image(...val.reg);
                    }
                }
                else {
                    MockData(val);
                }
            }
            else {
                obj[key] = Mockjs.mock(val);
            }
        });
    }
    return obj;
};
let responseData;
router.use(function (req, res, next) {
    responseData = Object.assign({}, constants.RES_INFO.success, { data: {} });
    next();
});
router.use('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.method);
    console.log(req.path);
    const method = req.method;
    const path = req.path;
    const doc = yield mockModel.findOne({
        path,
        type: { $regex: method, $options: '$i' } // 忽略大小写
    });
    if (doc && doc.reg) {
        responseData.data = Mockjs.mock(doc.reg);
    }
    res.json(responseData);
}));
module.exports = router;
