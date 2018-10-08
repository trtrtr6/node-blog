/**
 * Created by xyy on 2017/9/10.
 */
var mongoose = require('mongoose');
var articleSchema = require('../schemas/article');

module.exports = mongoose.model('Article',articleSchema);