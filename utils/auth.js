/**
 * Created by xyy on 2017/3/19.
 */
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig')

module.exports = {
    creatToken:function(user){
        var token = jwt.sign(user,jwtConfig.secret,{
            'expiresInMinutes':jwtConfig.expiresInMinutes
        });
        return token;
    },
    checkToken:function(req, res, next){
        console.log('检查post的信息或者url查询参数或者头信息');
        //检查post的信息或者url查询参数或者头信息
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // 解析 token
        if (token) {
            // 确认token
            jwt.verify(token, jwtConfig.secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'token信息错误.' });
                } else {
                    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                    req.api_user = decoded;
                    console.dir(req.api_user);
                    next();
                }
            });
        } else {
            // 如果没有token，则返回错误
            return res.status(403).send({
                success: false,
                message: '没有提供token！'
            });
        }
    }
}