const User = require('../models/User')
const Interview = require('../models/Interview')

const index = async (req, res) => {
  const interviews = await Interview.all()

  return interviews
}

const show = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.find(id)

  return interview
}

const create = async (req, res) => {
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

const update = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.find(id)

  // edit interview
  return interview
}

const destroy = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.find(id)

  // edit interview
  return interview
}

const admin = {
  async assign (_, res) {},
  async edit (_, res) {},
  async update (_, res) {}
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  admin
}
