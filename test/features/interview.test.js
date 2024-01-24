const assert = require('assert').strict
const app = require('../app')

const User = require('../../src/app/models/User')
const Interview = require('../../src/app/models/Interview')

describe('Interview', () => {
  before(async () => {
    await app.start()

    await app.reset()
  })

  after(async () => {
    await app.close()
  })

  it('get all interviews', async () => {
    await Interview.create({
      interviewee: new User({
        role: 'interviewee',
        firstname: 'Ivan',
        lastname: 'Fakov'
      }),
      profession: 'PHP',
      position: 'middle',
      description: 'Im happy'
    })

    const res = await app.get('/interview')

    assert.equal(res.statusCode, 200)

    const body = res.json()

    assert(Array.isArray(body))
    assert.equal(body.length, 1)

    const [interview] = body

    assert.ok(interview.id)
    assert.equal(interview.status, 'wait_for_interviewer')
  })

  it('get one interview', async () => {
    const interview = await Interview.create({
      interviewee: new User({
        role: 'interviewee',
        firstname: 'Ivan',
        lastname: 'Fakov'
      }),
      profession: 'PHP',
      position: 'middle',
      description: 'Im happy'
    })

    const res = await app.get(`/interview/${interview.id}`)

    const body = res.json()

    assert.equal(body.id, interview.id)
  })

  it('create interview', async () => {
    const data = {
      profession: 'PHP',
      position: 'junior'
    }

    const res = await app.post('/interview', data)

    const body = res.json()

    assert.ok(body.id)

    assert.equal(body.profession, data.profession)
    assert.equal(body.position, data.position)
    assert.equal(body.status, 'wait_for_interviewer')
  })

  it('delete interview', async () => {
    let interview = await Interview.create({
      interviewee: new User({
        role: 'interviewee',
        firstname: 'Ivan',
        lastname: 'Fakov'
      }),
      profession: 'PHP',
      position: 'middle',
      description: 'Im happy'
    })

    const res = await app.delete(`/interview/${interview.id}`)

    const body = res.json()

    assert.equal(body.id, interview.id)

    assert.equal(await Interview.find(interview.id), undefined)
  })

  it('update interview', async () => {
    let interview = await Interview.create({
      interviewee: new User({
        role: 'interviewee',
        firstname: 'Ivan',
        lastname: 'Fakov'
      }),
      profession: 'PHP',
      position: 'middle',
      description: 'Im happy'
    })

    const res = await app.put(`/interview/${interview.id}`, { profession: 'Javascript' })

    const body = res.json()

    assert.equal(body.id, interview.id)
    assert.equal(body.profession, 'Javascript')

    interview = await Interview.find(interview.id)

    assert.equal(interview.profession, 'Javascript')
  })

  it('assign interview', async () => {
    const interviewer = await User.create({
      firstname: 'Yoda',
      lastname: 'Adoy',
      role: 'interviewer'
    })

    let interview = await Interview.create({
      interviewee: new User({
        role: 'interviewee',
        firstname: 'Ivan',
        lastname: 'Fakov'
      }),
      profession: 'PHP',
      position: 'middle',
      description: 'Im happy'
    })

    const res = await app.post(`/admin/interview/${interview.id}/assign`, { interviewer_id: interviewer.id })
    assert.equal(res.statusCode, 200)

    interview = await Interview.find(interview.id)

    assert.ok(interview)

    assert.equal(interview.interviewerId, interviewer.id)
    assert.equal(interview.status, 'coming')
  })
})
