const controllers = require('./app/controllers')

module.exports = (app, _, done) => {
  app.get('/me', controllers.my.index)

  app.context('interview', (app) => {
    app.get('/', controllers.interview.index)
    app.post('/', controllers.interview.create)
    app.get('/:id', controllers.interview.show)
    app.put('/:id', controllers.interview.update)
    app.delete('/:id', controllers.interview.destroy)
  })

  done()
}
