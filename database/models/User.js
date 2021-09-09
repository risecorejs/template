const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, { STRING }) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      email: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false,
        set(val) {
          this.setDataValue('password', bcrypt.hashSync(val, 1))
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      scopes: {
        withoutPassword: {
          attributes: { exclude: 'password' }
        }
      }
    }
  )

  return User
}
