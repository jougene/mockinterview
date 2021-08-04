const repl = require('repl')

const fastify = require('./src/bootstrap')
const app = require('./test/app')
const models = require('./src/app/models')
const config = require('./src/config')

const server = repl.start({ prompt: 'app#> ', useGlobal: true })
server.context.fastify = fastify
server.context.app = app

Object.entries(models).forEach(([name, model]) => {
  server.context[name] = model
})

server.setupHistory(`${config.app.dir.root}/.node_history`, e => {
  if (e) {
    console.error(e)
    console.error(e.stack)
    process.exit(1)
  }
})
