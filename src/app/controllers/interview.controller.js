const { User, Interview } = require('../models')

const index = async (req, res) => {
  const interviews = await Interview.q

  return interviews
}

const show = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.q.findById(id)

  return interview
}

const create = async (req, res) => {
  const user = await User.me()

  const { profession, position, description } = req.body

  const interview = await Interview.q.insert({
    interviewee_id: user.id,
    profession,
    position,
    description
  })

  return interview
}

const update = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.q.findById(id)

  // edit interview
  return interview
}

const destroy = async (req, res) => {
  const { params: { id } } = req
  const interview = await Interview.q.findById(id)

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
