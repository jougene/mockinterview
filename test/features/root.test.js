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

    const comingInterview = await Interview.create({ profession: 'PHP', position: 'Junior', status:'coming' })
    const passedInterview = await Interview.create({ profession: 'PHP', position: 'Junior', status:'passed' })
    const userComingInterview = await Interview.create({ profession: 'PHP', position: 'Junior', status:'coming', intervieweeId: user.id })

    const res = await app.get('/')

    assert.equal(res.statusCode, 200)

    const body = res.json()

    assert.ok(body.comingInterviews.find(i => i.id === comingInterview.id))
    assert.ok(body.comingInterviews.find(i => i.id === userComingInterview.id))

    assert.ok(body.pastInterviews.find(i => i.id === passedInterview.id))

    assert.ok(body.userComingInterviews.find(i => i.id === userComingInterview.id))
  })
})
