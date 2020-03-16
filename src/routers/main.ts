/**
 * Created by xyy on 2017/3/5.
 */
import express from 'express'
var router = express.Router()
// var Article = require('../models/Article')
// var Comment = require('../models/Comment')
// var Response = require('../models/Response')

// router.get('/', function(req, res, next) {
//   Article.find({ del: { $ne: '0' } })
//     .populate('_user', 'username _id')
//     .sort({ _id: -1 })
//     .exec(function(err, article_list) {
//       res.render('index', {
//         // userInfo: req.userInfo,
//         article_list: article_list
//       })
//     })
// })
// router.get('/new_article', function(req, res, next) {
//   res.render('main/new_article', {
//     userInfo: req.userInfo
//   })
// })
// router.post('/new_article', function(req, res, next) {
//   var title = req.body.title
//   var content = req.body.content
//   var user_id = req.userInfo._id
//   console.log(title)
//   console.log(content)
//   var article = new Article({
//     title: title,
//     content: content,
//     _user: user_id
//   })
//   article.save().then(function(newArticle) {
//     res.redirect('/')
//     /*res.render('main/article_detail',{
//         userInfo:req.userInfo,
//         article:{
//             title:newArticle.title,
//             content:newArticle.content
//         }
//     });*/
//   })
// })
// // GET /article_detail/:id 单独一篇的文章页
// router.get('/article_detail/:id', function(req, res, next) {
//   var id = req.params.id
//   Article.findOne({
//     _id: id
//   })
//     .populate('_user', 'username _id')
//     .populate({
//       path: '_comments',
//       options: { sort: { _id: -1 } },
//       populate: [
//         {
//           path: '_user',
//           select: 'username _id'
//         },
//         {
//           path: '_responses',
//           populate: {
//             path: '_user',
//             select: 'username _id'
//           }
//         }
//       ]
//     })
//     .then(function(article) {
//       console.log(article)
//       res.render('main/article_detail', {
//         userInfo: req.userInfo,
//         article: article
//       })
//     })
// })

// // POST /article_detail/:id/comment 创建一条评论
// router.post('/article_detail/:id/comment', function(req, res, next) {
//   var article_id = req.params.id
//   var user_id = req.userInfo._id
//   var content = req.body.content
//   var comment = new Comment({
//     content: content,
//     _user: user_id
//   })
//   comment.save().then(function(newComment) {
//     var comment_id = newComment._id
//     Article.findOne({
//       _id: article_id
//     })
//       .then(function(article) {
//         article._comments.push(comment_id)
//         console.log(article)
//         return article.save()
//       })
//       .then(function(newArticle) {
//         res.json({ message: '成功' })
//       })
//   })
// })

// // POST /article_detail/:id/response 创建一条回复
// router.post('/article_detail/:id/response', function(req, res, next) {
//   var comment_id = req.params.id
//   var user_id = req.userInfo._id
//   var content = req.body.content
//   var response = new Response({
//     content: content,
//     _user: user_id
//   })
//   response.save().then(function(newResponse) {
//     var response_id = newResponse._id
//     Comment.findOne({
//       _id: comment_id
//     })
//       .then(function(comment) {
//         comment._responses.push(response_id)
//         console.log(comment)
//         return comment.save()
//       })
//       .then(function(newResponse) {
//         res.json({ message: '成功' })
//       })
//   })
// })
// // GET /article_detail/:id 编辑文章
// router.get('/edit_article/:id', function(req, res, next) {
//   var id = req.params.id
//   Article.findOne({
//     _id: id
//   }).then(function(article) {
//     console.log(article)
//     var userInfo = req.userInfo
//     if (userInfo._id && article && userInfo._id == article._user) {
//       res.render('main/edit_article', {
//         userInfo: req.userInfo,
//         article: article
//       })
//     } else {
//       res.render('404')
//     }
//   })
// })
// // POST /edit_article/:id 编辑文章
// router.post('/edit_article/:id', function(req, res, next) {
//   var id = req.params.id
//   var title = req.body.title
//   var content = req.body.content
//   var article = {
//     title: title,
//     content: content
//   }
//   Article.findByIdAndUpdate(id, article, function(err, docs) {
//     if (err) console.log(err)
//     res.redirect('/article_detail/' + id)
//   })
// })
// // DELETE /delete_article/:id 删除文章
// router.get('/delete_article/:id', function(req, res, next) {
//   var id = req.params.id
//   var article = {
//     del: '0'
//   }
//   Article.findByIdAndUpdate(
//     {
//       _id: id
//     },
//     article
//   ).then(function(doc) {
//     console.log(`删除${id}的文章成功`)
//     console.log(doc)
//     res.redirect('/')
//   })
// })
module.exports = router
