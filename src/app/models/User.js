const { snakeCaseMappers } = require('objection')
const Model = require('../BaseModel')

class User extends Model {
  static tableName = 'users'

  static get virtualAttributes () {
    return ['fullName']
  }

  get fullName () {
    return this.lastname ? `${this.firstname} ${this.lastname}` : this.firstname
  }

  static async me () {
    return this.q.where({ firstname: 'Евгений', lastname: 'Синицын' }).first()
  }

  static async admin () {
    return this.q.where({ role: 'admin', firstname: 'admin' }).first()
  }

  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  static get relationMappings () {
    const Interview = require('./Interview')

    return {
      // пройденные
      passedInterviews: {
        relation: Model.HasManyRelation,
        modelClass: Interview,
        join: {
          from: 'users.id',
          to: 'interviews.interviewee_id'
        }
      },
      // проведенные
      conductedInterviews: {
        relation: Model.HasManyRelation,
        modelClass: Interview,
        join: {
          from: 'users.id',
          to: 'interviews.interviewer_id'
        }
      }
    }
  }
}

module.exports = User
