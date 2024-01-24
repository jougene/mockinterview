const User = require('../models/User')
const Interview = require('../models/Interview')

const index = async (_, res) => {
  const user = await User.me()

  const interviews = await Interview
    .waiting()
    .where({ intervieweeId: user.id })
    .orderBy('createdAt', 'DESC')

  return { user, interviews }
}

module.exports = { index }
