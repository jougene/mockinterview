const app = require('../src/bootstrap')

class Application {
  async start () {
    return app.ready()
  }

  async get (url) {
    return this.request('GET', url)
  }

  async post (url, data = {}) {
    return this.request('POST', url, { params: data })
  }

  async request (method, url, options) {
    const { params, headers } = { ...{ headers: {}, params: null }, ...options }

    return app.inject({ method, url, headers, payload: params })
  }

  async close () {
    await app.close()
  }
}

module.exports = new Application()
