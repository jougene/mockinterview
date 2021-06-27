const { Model, snakeCaseMappers } = require('objection')

class BaseModel extends Model {
  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  static get q () {
    return super.query()
  }

  static with (...relations) {
    return super.query().withGraphJoined(`[${relations.join(',')}]`)
  }
}

module.exports = BaseModel
