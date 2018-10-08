/**
 * Created by xyy on 2017/10/2.
 */
//markdown解析
var marked = require('marked');
//时间处理
var moment = require('moment');
var pkg = require('../package');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

module.exports = function(app){
    // 设置模板全局常量
    app.locals.blog = {
        title: pkg.name,
        description: pkg.description
    };
    app.locals.marked = function(content){
        var html = ''
        if(content){
            return marked(content);
        }
        return html;
    };
    app.locals.dateFormat = function(obj, format) {
        if (format == undefined) {
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        var ret = moment(obj).format(format);
        return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
    };
    app.locals.markedes = function(content){
        var des = "";
        if(content){
            //截取<!--readmore-->前面的部分作为描述
            var match = content.match(/([\s\S]*)<!--\s*readmore\s*-->/);
            if(match){
                des = match[1];
                des = marked(des);
            }
        }
        return des;
    }
}