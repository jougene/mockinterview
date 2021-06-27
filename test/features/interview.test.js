const assert = require('assert')
const app = require('../app')

describe('get all interviews', () => {
  it('success', async () => {
    const res = await app.get('/interview')

    console.log(res.body)

    assert.equal(res.statusCode, 200)
  })
})

after(async () => {
  await app.close()
})
