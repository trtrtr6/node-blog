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
/**
 * Created by xyy on 2017/3/5.
 */
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const mockModel = require('../models/Mock');
const constants = require('../utils/constants');
const pagination = require('../utils/pagination');
var responseData;
router.use(function (req, res, next) {
    responseData = Object.assign({}, constants.RES_INFO.success, { data: {} });
    next();
});
//新增一个mock接口
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { name, path, type, reg } = body;
    if (!(name && path && type && reg)) {
        responseData.data = '字段不能为空';
        res.json(responseData);
        return;
    }
    const count = yield mockModel.count({ path, type });
    if (count && count > 0) {
        responseData.data = '已存在对应的接口，添加失败';
        res.json(responseData);
        return;
    }
    const doc = yield mockModel.save({ name, path, type, reg });
    responseData.data = doc;
    res.json(responseData);
}));
//删除mock接口
router.get('/del/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield mockModel.delById(id);
    res.json(responseData);
}));
//更新mock接口
router.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.params.id;
    const { name, path, type, reg } = body;
    if (!(name && path && type && reg)) {
        responseData.data = '字段不能为空';
        res.json(responseData);
        return;
    }
    yield mockModel.updateById(id, { name, path, type, reg });
    res.json(responseData);
}));
//查看mock接口详情
router.get('/info/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const doc = yield mockModel.findById(id);
    responseData.data = doc;
    res.json(responseData);
}));
//查看mock接口列表
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const page = pagination.getPage(query.page);
    const size = pagination.getSize(query.size);
    try {
        const option = Object.keys(query).reduce((result, item) => {
            if (query[item] && item !== 'page' && item !== 'size') {
                result[item] = query[item];
            }
            return result;
        }, {});
        const count = yield mockModel.count(option);
        const list = yield mockModel.find(option, page, size);
        responseData.data = {
            list,
            pagination: pagination.getPageInfo(count, page, size)
        };
        res.json(responseData);
    }
    catch (error) {
        responseData.data = error;
        res.json(responseData);
    }
}));
module.exports = router;
