const { User, Interview } = require('../models')

const index = async (_, res) => {
  const user = await User.me()

  const interviews = await Interview.q
    .where('interviewee_id', user.id)
    .where('status', 'wait_for_interviewer')
    .orderBy('createdAt', 'DESC')

  return { user, interviews }
}

module.exports = { index }
