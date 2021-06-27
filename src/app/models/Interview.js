const Model = require('../BaseModel')

class Interview extends Model {
  static tableName = 'interviews'

  $beforeInsert () {
    this.status = 'wait_for_interviewer'
  }

  // static passed () {
  // return this.q.where('status', 'passed')
  // }

  // static coming () {
  // return this.q.where('status', 'coming')
  // }

  static withParticipants () {
    return this.with('interviewer', 'interviewee')
  }

  static get relationMappings () {
    const User = require('./User')

    return {
      interviewer: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'interviews.interviewer_id',
          to: 'users.id'
        }
      },
      interviewee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'interviews.interviewee_id',
          to: 'users.id'
        }
      }
    }
  };
}

module.exports = Interview
