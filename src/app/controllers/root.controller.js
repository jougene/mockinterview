const User = require('../models/User')
const Interview = require('../models/Interview')

const { getPreviewFromVideoLink } = require('../helpers')

const handler = async (_, res) => {
  const interviews = await Interview.withParticipants().whereIn('status', ['passed', 'coming'])
  const user = await User.q.where('role', 'interviewee').first()

  const userComingInterviews = await Interview.with('interviewer')
    .where('interviewee_id', user.id)
    .where('status', 'coming')

  const interviewsWithPreview = interviews.map(i => {
    return { ...i, preview: getPreviewFromVideoLink(i.videoLink) }
  })

  const comingInterviews = interviewsWithPreview.filter(i => i.status === 'coming')
  const pastInterviews = interviewsWithPreview.filter(i => i.status === 'passed')

  return res.view('index', { comingInterviews, pastInterviews, userComingInterviews })
}

module.exports = handler
