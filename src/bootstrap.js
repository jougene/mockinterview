const fastify = require('fastify')
const Noar = require('@jougene/noar')

const config = require('./config')

const app = fastify({ logger: { level: 'error', prettyPrint: { colorize: true } } })

app.decorate('context', (prefix, handlers) => {
  app.register((app, _, done) => {
    handlers(app)
    done()
  }, { prefix })
})

// routes
app.register(require('./routes.js'))
app.register(require('./routes.admin.js'), { prefix: '/admin' })
app.register(async () => {
  app.db = await Noar.bootstrap({ ...config.database, models: config.app.dir.models })
})

module.exports = app
