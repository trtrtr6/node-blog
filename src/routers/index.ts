export default app => {
  app.use('/admin', require('./admin'))
  app.use('/api', require('./api'))
  app.use('/mock', require('./mock'))
  app.use('/mock-api', require('./mock/mockApi'))
  app.use('/events', require('./events'))
  app.use('/', require('./main'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
