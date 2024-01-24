const User = require('../models/User')
const Interview = require('../models/Interview')

const { getPreviewFromVideoLink } = require('../helpers')

const handler = async () => {
  const interviews = await Interview.withParticipants()

  // return 42
    // .whereIn('status', ['passed', 'coming'])
  const user = await User.where({ role: 'interviewee' }).first()

  const userComingInterviews = await Interview.with('interviewer')
    .where({ intervieweeId: user.id, status: 'coming' })

  const interviewsWithPreview = interviews.map(i => {
    return { ...i, preview: getPreviewFromVideoLink(i.videoLink) }
  })

  const comingInterviews = interviewsWithPreview.filter(i => i.status === 'coming')
  const pastInterviews = interviewsWithPreview.filter(i => i.status === 'passed')

  return { comingInterviews, pastInterviews, userComingInterviews }
}

module.exports = handler
