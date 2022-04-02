module.exports = {
  async up (queryInterface, { INTEGER, STRING, DATE,  }) {
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
  async down  (queryInterface, Sequelize) {
    await queryInterface.dropTable('user')
  }
}
