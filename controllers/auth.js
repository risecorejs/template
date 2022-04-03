const { User } = require('@risecorejs/core/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// SIGN-UP
exports.signUp = async (req, res) => {
  const errors = await req.validator({
    email: 'required|email|max:200|unique:user',
    password: 'required|string|between:8-200',
    passwordConfirm: 'required|as:password'
  })

  if (errors) {
    return res.status(400).json({ errors })
  }

  const fields = req.only('email', 'password')

  await User.create(fields)

  return res.sendStatus(201)
}

// SIGN-IN
exports.signIn = async (req, res) => {
  const errors = await req.validator({
    email: 'required|email|find:user-email',
    password: 'required|string'
  })

  if (errors) {
    return res.status(400).json({ errors })
  }

  const user = await User.findOne({
    where: { email: req.body.email }
  })

  const passwordMatch = await bcrypt.compare(req.body.password, user.password)

  if (!passwordMatch) {
    return res.sendStatus(401)
  }

  const accessToken = jwt.sign({ userId: user.id }, $env('JWT_SECRET_KEY'), {
    expiresIn: $env('JWT_EXPIRES_IN')
  })

  return res.json({ accessToken })
}
