var mongoose = require('mongoose');
var mockSchema = require('../schemas/mock');

module.exports = mongoose.model('Mock', mockSchema);
