const show = async (_, res) => {
  return 42
}

const form = (_, res) => {}

const create = async (req, res) => {
  // const { body } = req

  return 'ok'
}

const destroy = (_, res) => {}

module.exports = { show, form, create, destroy }
