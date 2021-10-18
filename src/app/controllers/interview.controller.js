const User = require('../models/User')
const Interview = require('../models/Interview')

const index = async (req, res) => {
  const interviews = await Interview.all()

  return interviews
}

const show = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.find(id)

  if (!interview) {
    return res.code(404).send('Interview not found')
  }

  return interview
}

const create = async (req, res) => {
  const user = await User.me()

  const { profession, position, description } = req.body

  const interview = await Interview.create({
    intervieweeId: user.id,
    profession,
    position,
    description
  })

  return interview
}

const update = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.find(id)

  console.log(`Updating interview with id [${id}]... `)

  // edit interview
  return interview
}

const destroy = async (req, res) => {
  const { params: { id } } = req

  const interview = await Interview.find(id)

  console.log(`Deleting interview with id [${id}]... `)

  // edit interview
  return interview
}

const admin = {
  async assign (req, res) {
    const { params: { id } } = req
    const { interviewer_id: interviewerId } = req.body

    let interview = await Interview.find(id)
    const interviewer = await User.where({ role: 'interviewer' }).find(interviewerId)

    if (!interviewer) {
      return res.code(404).send('Interviewer not found')
    }

    interview.interviewer = interviewer

    console.log(`Assigning interview [${id}] to interviewer [${interviewerId}]`)

    interview = await interview.save()

    return interview
  },
  async edit (_, res) {
    res.send('Not implemented yet!')
  },
  async update (_, res) {
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
