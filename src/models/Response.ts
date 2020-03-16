import mongoose from 'mongoose'
var responseSchema = require('../schemas/response')

module.exports = mongoose.model('Response', responseSchema)
