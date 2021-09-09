require('dotenv').config()

const env = require('@risecorejs/helpers/lib/env')

module.exports = {
  [env('NODE_ENV', 'development')]: {
    dialect: env('DB_DIALECT'),
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    database: env('DB_NAME'),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    logging: eval(env('DB_LOGGING'))
  }
}
