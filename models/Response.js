/**
 * Created by xyy on 2017/9/10.
 */
var mongoose = require('mongoose');
var responseSchema = require('../schemas/response');

module.exports = mongoose.model('Response',responseSchema);