const repl = require('repl')

const fastify = require('./src/bootstrap')
const config = require('./src/config')

fastify.ready().then(app => {
  const server = repl.start({ prompt: 'app#> ', useGlobal: true })

  server.context.f = fastify

  Object.entries(app.db.models).forEach(([name, model]) => {
    server.context[name] = model
  })

  server.setupHistory(`${config.app.dir.root}/.node_history`, e => {
    if (e) {
      console.error(e)
      console.error(e.stack)
      process.exit(1)
    }
  })
})
