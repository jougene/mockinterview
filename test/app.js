const app = require('../src/bootstrap')

class Application {
  constructor() {
    this.app = app
  }

  async start () {
    return this.app.ready()
  }

  async get (url) {
    return this.request('GET', url)
  }

  async post (url, data = {}) {
    return this.request('POST', url, { params: data })
  }

  async put (url, data = {}) {
    return this.request('PUT', url, { params: data })
  }

  async delete (url, data = {}) {
    return this.request('DELETE', url, { params: data })
  }

  async request (method, url, options) {
    const { params, headers } = { ...{ headers: {}, params: null }, ...options }

    return this.app.inject({ method, url, headers, payload: params })
  }

  async reset() {
    await this.app.db.connection.raw(`TRUNCATE users RESTART IDENTITY CASCADE`)
    await this.app.db.connection.raw(`TRUNCATE interviews RESTART IDENTITY CASCADE`)
  }

  async close () {
    await this.app.db.connection.destroy()
    await this.app.close()
  }
}

module.exports = new Application()
