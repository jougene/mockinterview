const { Model } = require('@jougene/noar')

class User extends Model {
  static get relations () {
    return {
      passedInterviews: { hasMany: require('./Interview') },
      conductedInterviews: { hasMany: require('./Interview') }
    }
  }

  get fullName () {
    return this.lastname ? `${this.firstname} ${this.lastname}` : this.firstname
  }

  static async me () {
    return this.where({ firstname: 'Eugene', lastname: 'Sinitsyn' }).first()
  }

  static async interviewer () {
    return this.where({ role: 'interviewer' }).first()
  }

  static async admin () {
    return this.where({ role: 'admin', firstname: 'admin' }).first()
  }
}

module.exports = User
