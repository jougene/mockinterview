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
    this.interviewerId = interviewer.id
    this.plannedAt = plannedAt

    this.status = 'coming'

    return this.save()
  }

  async unassign () {
    this.interviewerId = null
    this.status = 'wait_for_interviewer'
    this.plannedAt = null

    return this.save()
  }

  async markAsPassed () {
    this.status = 'passed'

    return this.save()
  }
}

module.exports = Interview
