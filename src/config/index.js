const path = require('path')

const rootDir = path.resolve(__dirname, '../..')

const config = {
  app: {
    dir: {
      root: rootDir,
      views: `${rootDir}/views`,
      public: `${rootDir}/public`
    }
  },
  database: require('./database'),
  mail: require('./mail')
}

module.exports = config
