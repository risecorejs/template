module.exports = {
  up: async (queryInterface, { DATE, INTEGER, STRING }) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },

      email: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: DATE
      },
      updatedAt: {
        allowNull: false,
        type: DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user')
  }
}
