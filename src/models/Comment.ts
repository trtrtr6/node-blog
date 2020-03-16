import mongoose from 'mongoose'
var commentSchema = require('../schemas/comment')

module.exports = mongoose.model('Comment', commentSchema)
