const assert = require('assert').strict
const app = require('../app')

const User = require('../../src/app/models/User')
const Interview = require('../../src/app/models/Interview')

describe('Interview', () => {
  before(async () => {
    await app.start()
    // reset database
    await User.create({
      firstname: 'Евгений', lastname: 'Синицын', role: 'interviewee'
    })
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

    console.dump({ body })
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

    console.dump({ body })
  })

  it('create interview', async () => {
    const data = {
      profession: 'PHP',
      position: 'junior'
    }

    const res = await app.post('/interview', data)

    const body = res.json()

    console.dump({ body })
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

    interview = await Interview.find(interview.id)

    assert.equal(interview, undefined)
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

    console.dump({ body })

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

  after(async () => {
    await app.close()
  })
})
