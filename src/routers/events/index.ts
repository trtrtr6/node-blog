import express from "express";
import eventsModel from "../../models/Events";
import { RES_INFO } from "../../utils/constants";
import pagination from "../../utils/pagination";
import LZString from "lz-string";

const router = express.Router();

let responseData;

router.use((_req, _res, next) => {
  responseData = Object.assign({}, RES_INFO.SUCCESS, { data: {} });
  next();
});

/**
 *  事件录制，新增上报一个events数据
 * @route POST /events/add
 * @group 录制 - 用户行为事件录制
 * @param {VoEvent.model} body.body.required - 上报录制事件
 * @returns {ResCommon.model} 200 - 上报成功的信息
 * @returns {ResErrorCommon.model} default - 上报失败的信息
 */
router.post("/add", async (req, res) => {
  const body = req.body;
  let { system, username, events, sign } = body;
  console.log("body=====", req.body);
  // events = LZString.decompressFromBase64(events)
  // events = LZString.compressToBase64(events)
  if (sign) {
    const doc = await eventsModel.findOne({ sign });
    if (!doc) {
      const obj = { system, username, events: [events], sign };
      await eventsModel.save(obj);
    } else {
      const tempEvents = <string[]>doc.events;
      tempEvents.push(events);
      await eventsModel.updateById(doc._id, { events: tempEvents });
    }
  } else {
    const obj = { system, username, events };
    await eventsModel.save(obj);
  }
  res.json(responseData);
});

//
/**
 *  查看事件详情
 * @route POST /info/{id}
 * @group 录制 - 用户行为事件详情
 * @returns {ResVoEvent.model} 200 - 查询成功的信息
 * @returns {ResErrorCommon.model} default - 查询失败信息
 */
router.get("/info/:id", async (req, res) => {
  const id = req.params.id;
  const doc = await eventsModel.findById(id);
  // doc.events = LZString.decompressFromBase64(doc.events)
  responseData.data = doc;
  res.json(responseData);
});

//查看events列表
router.get("/list", async (req, res) => {
  const query = req.query;
  const page = pagination.getPage(query.page as string);
  const size = pagination.getSize(query.size as string);
  try {
    const option = Object.keys(query).reduce((result, item) => {
      if (query[item] && item !== "page" && item !== "size") {
        result[item] = query[item];
      }
      return result;
    }, {});
    const count = await eventsModel.count(option);
    const list = await eventsModel.find(
      option,
      page,
      size,
      "_id system username updateTime"
    );
    responseData.data = {
      list,
      pagination: pagination.getPageInfo(count, page, size),
    };
  } catch (error) {
    responseData.data = error;
  }
  res.json(responseData);
});

module.exports = router;
