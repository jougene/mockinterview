const app = require('./bootstrap.js')

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Start on address ${address}`)
})
