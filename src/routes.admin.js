const controllers = require('./app/controllers')

module.exports = (app, _, done) => {
  app.context('user', app => {
    app.get('/', controllers.user.show)
    app.post('/', controllers.user.create)
    app.delete('/', controllers.user.destroy)
  })
  app.context('interview', (app) => {
    app.post('/assign', controllers.interview.admin.assign)

    app.get('/:id/edit', controllers.interview.admin.edit)
    app.put('/:id', controllers.interview.admin.update)
  })
  done()
}
