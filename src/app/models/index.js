const fs = require('fs')
const path = require('path')

module.exports = fs.readdirSync(__dirname)
  .filter(file => file !== path.basename(__filename))
  .reduce((res, fileName) => {
    const name = path.parse(fileName).name

    res[name] = require(`./${name}`)

    return res
  }, {})
