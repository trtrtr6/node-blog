/**
 * Created by xyy on 2017/3/5.
 * 后台业务逻辑处理
 */
var express = require('express');

var router = express.Router();

router.get('/',function(req,res,next){
    res.render('admin/index');
});

module.exports = router;