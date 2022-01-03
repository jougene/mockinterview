process.env.DB_NAME = 'interview_test'

console.dump = (value) => {
  console.log(require('util').inspect(value, false, 5, true))
}
