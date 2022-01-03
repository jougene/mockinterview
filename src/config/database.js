const path = require('path')
const rootDir = path.resolve(__dirname, '../..')

module.exports = {
  client: 'pg',
  connection: {
    host: 'db',
    port: 5432,
    user: 'interview',
    password: 'interview',
    database: process.env.DB_NAME ?? 'interview'
  },
  seeds: {
    directory: `${rootDir}/src/db/seeds`
  },
  migrations: {
    directory: `${rootDir}/src/db/migrations`,
    tableName: 'migrations'
  },
  acquireConnectionTimeout: 5000,
  pool: {
    min: 2,
    max: 5
  }
}
