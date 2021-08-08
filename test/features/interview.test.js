const assert = require('assert')
const app = require('../app')

describe('get all interviews', () => {
  before(async () => {
    await app.start()
  })

  it('success', async () => {
    const res = await app.get('/interview')

    assert.equal(res.statusCode, 200)
  })
})

after(async () => {
  await app.close()
})
