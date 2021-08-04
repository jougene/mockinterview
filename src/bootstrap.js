const fastify = require('fastify')
const config = require('./config')

const app = fastify({ logger: { level: 'error', prettyPrint: { colorize: true } } })

// database
const models = require('./app/models')
const knex = require('knex')(config.database)
const Noar = require('@jougene/noar')

Model.knex(knex)

app.register(require('fastify-objectionjs'), {
  knexConfig: config.database,
  models: Object.values(models)
})

app.decorate('context', (prefix, handlers) => {
  app.register((app, _, done) => {
    handlers(app)
    done()
  }, { prefix })
})

// routes
app.register(require('./routes.js'))
app.register(require('./routes.admin.js'), { prefix: '/admin' })

module.exports = app
