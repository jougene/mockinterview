const assert = require('assert').strict
const app = require('../app')

const User = require('../../src/app/models/User')
const Interview = require('../../src/app/models/Interview')

describe('Root', () => {
  before(async () => {
    await app.start()

    await app.reset()

  })

  it('get root data', async () => {
    const user = await User.create({ firstname: 'Eugene', lastname: 'Sinitsyn', role: 'interviewee' })

    const interview = await Interview.create({ profession: 'PHP', position: 'Junior', status:'wait_for_interviewer', intervieweeId: user.id })

    const res = await app.get('/me')

    assert.equal(res.statusCode, 200)

    const body = res.json()

    assert.ok(body)

    assert.equal(body.interviews.length, 1)
    assert.equal(body.interviews[0].id, interview.id)
  })
})
