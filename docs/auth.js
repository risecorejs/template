// SIGN-UP
exports.signUp = {
  description: 'Sign-up',
  bodyUI: true,
  body: {
    email: {
      type: 'string',
      required: true,
      value: 'user@domain.zone',
      description: 'Email must be unique'
    },
    password: {
      type: 'string',
      required: true,
      value: 'some-password',
      description: 'Minimum number of characters 8'
    },
    passwordConfirm: {
      type: 'string',
      required: true,
      value: 'some-password',
      description: 'This field must be the same as "password"'
    }
  }
}

// SIGN-IN
exports.signIn = {
  description: 'Sign-in',
  bodyUI: true,
  body: {
    email: {
      type: 'string',
      required: true,
      value: 'admin@domain.zone'
    },
    password: {
      type: 'string',
      required: true,
      value: 'change-me'
    }
  }
}
