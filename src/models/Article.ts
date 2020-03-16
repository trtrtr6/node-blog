import mongoose from 'mongoose'
const articleSchema = require('../schemas/article')

export default mongoose.model('Article', articleSchema)
