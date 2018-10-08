
/**
 * Created by xyy on 2017/3/10.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

module.exports = mongoose.model('User',userSchema);
