const jwt = require('jsonwebtoken')

const { User } = require('models')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ errors: { accessToken: 'required' } })
  }

  try {
    const { userId } = jwt.verify(authorization, $env('JWT_SECRET_KEY'))

    const user = await User.scope('withoutPassword').findOne({
      where: { id: userId }
    })

    if (!user) {
      return res.status(401).json({ errors: { user: 'not_found' } })
    }

    req.me = user

    next()
  } catch (error) {
    console.log(error)

    return res.status(401).json({ errors: { accessToken: 'invalid' } })
  }
}
