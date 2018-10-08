/**
 * Created by xyy on 2017/9/10.
 */
var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment');

module.exports = mongoose.model('Comment',commentSchema);