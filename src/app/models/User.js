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
    const [me] = await this.where({ firstname: 'Евгений', lastname: 'Синицын' })

    return me
  }

  static async interviewer () {
    const [res] = await this.where({ role: 'interviewer' })

    return res
  }

  static async admin () {
    return this.where({ role: 'admin', firstname: 'admin' }).first()
  }
}

module.exports = User
