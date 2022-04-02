const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const records = [      {
      email: 'admin@domain.zone',
      password: await bcrypt.hash('change-me', 1),
      updatedAt: new Date(),
      createdAt: new Date()
    }]

    return queryInterface.bulkInsert('user', records)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {})
  }
}
