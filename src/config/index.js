const path = require('path')

const rootDir = path.resolve(__dirname, '../..')

const config = {
  app: {
    dir: {
      root: rootDir,
      models: `${rootDir}/src/app/models`,
      views: `${rootDir}/views`,
      public: `${rootDir}/public`
    }
  },
  database: require('./database'),
  mail: require('./mail')
}

module.exports = config
