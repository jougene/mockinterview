const User = require('../models/User')
const Interview = require('../models/Interview')

const index = async (req, res) => {
  const interviews = await Interview.all().orderBy(['id', 'desc'])

  return interviews
}

const show = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.withParticipants().find(id)

  if (!interview) {
    return res.code(404).send('Interview not found')
  }

  return interview
}

const create = async (req, _res) => {
  const user = await User.me()

  const { profession, position, description } = req.body

  const interview = await Interview.create({
    interviewee: user,
    profession,
    position,
    description
  })

  return interview
}

const update = async (req, _res) => {
  const { params: { id } } = req
  const { profession } = req.body

  const interview = await Interview.find(id)

  await interview.update({ profession })

  console.log(`Updating interview with id [${id}]... `)

  return interview
}

const destroy = async (req, _res) => {
  const { params: { id } } = req

  const interview = await Interview.find(id)

  console.log(`Deleting interview with id [${id}]... `)

  await interview.remove()

  return interview
}

const admin = {
  async assign (req, res) {
    const { params: { id } } = req
    const { interviewer_id: interviewerId } = req.body

    let interview = await Interview.find(id)

    if (interview.status === 'coming') {
      return res.code(422).send('Interview already assigned')
    }

    const interviewer = await User.where({ role: 'interviewer' }).find(interviewerId)

    if (!interviewer) {
      return res.code(404).send('Interviewer not found')
    }

    console.log(`Assigning interview [${id}] to interviewer [${interviewerId}]`)

    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))

    interview = await interview.assign({ interviewer, plannedAt: tomorrow })

    return interview
  },

  async edit (_req, res) {
    // const { params: { id } } = req

    res.send('Not implemented yet!')
  },

  async update (_req, res) {
    // const { params: { id } } = req

    res.send('Not implemented yet!')
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  admin
}
