/**
 * Created by xyy on 2017/10/2.
 * 前台业务逻辑处理
 */
module.exports = function (app) {
  app.use('/admin', require('./admin'));
  app.use('/api', require('./api'));
  app.use('/mock', require('./mock'));
  app.use('/mock-api', require('./mockApi'));
  app.use('/', require('./main'));

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404');
    }
  });
}