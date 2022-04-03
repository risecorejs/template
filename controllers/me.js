const { User } = require('@risecorejs/core/models')

// SHOW
exports.show = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.me.id },
    attributes: { exclude: 'password' }
  })

  return res.json({ user })
}

// UPDATE
exports.update = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.me.id },
    attributes: { exclude: 'password' }
  })

  const errors = await req.validator({
    email: 'ifExists|required|email|unique:user',
    password: 'ifExists|required|string|min:8',
    passwordConfirm: 'ifExists:password|as:password'
  })

  if (errors) {
    return res.status(400).json({ errors })
  }

  const fields = req.only('email', 'password')

  if (fields) {
  await user.update(fields)

  }


  return res.end()
}
