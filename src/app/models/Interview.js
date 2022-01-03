const { Model } = require('@jougene/noar')

class Interview extends Model {
  static defaults = {
    status: 'wait_for_interviewer'
  }

  static scopes = {
    waiting: (qb) => qb.where({ status: 'wait_for_interviewer' }),
    passed: (qb) => qb.where({ status: 'passed' }),
    coming: (qb) => qb.where({ status: 'coming' })
  }

  static withParticipants () {
    return this.with('interviewer', 'interviewee')
  }

  static get relations () {
    return {
      interviewer: { belongsTo: require('./User'), join: 'interviewer_id' },
      interviewee: { belongsTo: require('./User'), join: 'interviewee_id' }
    }
  }

  // FSM?
  async assign ({ interviewer, plannedAt }) {
    return this.update({ interviewer, plannedAt, status: 'coming' })
  }

  async unassign () {
    return this.update({ plannedAt: null, interviewer: null, status: 'wait_for_interviewer' })
  }

  async markAsPassed () {
    return this.update({ status: 'passed' })
  }
}

module.exports = Interview
