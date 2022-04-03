const models = require('@risecorejs/core/models')

const endpoints = $crudBuilder({
  model: 'User',
  endpoints: {
    create,
    index,
    show,
    update,
    destroy
  }
})

module.exports = endpoints

// CREATE
function create() {
  return {
    rules: {
      email: 'required|email|max:200|unique:user',
      password: 'required|string|between:8-200',
      passwordConfirm: 'required|as:password'
    },
    fields: ['email', 'password'],
    response({ instance }) {
      const user = instance.toJSON()

      delete user.password

      return { user }
    }
  }
}

// SHOW
function index() {
  return {
    model: models.User.scope('withoutPassword'),
    response(users) {
      return { users }
    }
  }
}

// SHOW
function show() {
  return {
    model: models.User.scope('withoutPassword'),
    response(user) {
      return { user }
    }
  }
}

// UPDATE
function update() {
  return {
    rules({ instance: user }) {
      return {
        role: ['ifExists|required', ['only', $structs.users.roles]],
        email: `ifExists|if:email!=="${user.email}"|required|email|max:200|unique:user`,
        password: 'ifExists|required|string|between:8-200',
        passwordConfirm: 'ifExists:password|required|as:password'
      }
    },
    fields: ['role', 'email', 'password'],
    response({ instance }) {
      const user = instance.toJSON()

      delete user.password

      return { user }
    }
  }
}

// DESTROY
function destroy() {
  return {
    response(instance) {
      const user = instance.toJSON()

      delete user.password

      return { user }
    }
  }
}
