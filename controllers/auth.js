const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { User } = require('models')

// SIGN-UP
exports.signUp = async (req, res) => {
  const validationErrors = await req.validator({
    email: 'required|string|email|unique:user',
    password: 'required|string|min:8',
    passwordConfirm: 'as:password'
  })

  if (validationErrors) {
    return res.status(400).json({ errors: validationErrors })
  }

  const userData = req.only('email', 'password')

  await User.create(userData)

  return res.status(201).json({ success: true })
}

// SIGN-IN
exports.signIn = async (req, res) => {
  const validationErrors = await req.validator({
    email: 'required|string|email|find:user-email',
    password: 'required|string'
  })

  if (validationErrors) {
    return res.status(400).json({ errors: validationErrors })
  }

  const user = await User.findOne({
    where: { email: req.body.email }
  })

  const passwordMatch = await bcrypt.compare(req.body.password, user.password)

  if (!passwordMatch) {
    return res.status(401).json()
  }

  const accessToken = jwt.sign({ userId: user.id }, $env('JWT_SECRET_KEY'), {
    expiresIn: $env('JWT_EXPIRES_IN')
  })

  return res.json({ accessToken })
}
