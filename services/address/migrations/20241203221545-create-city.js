'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      initials: {
        type: Sequelize.STRING,
      },
      state_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'states',
          key: 'id',
        },
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cities')
  },
}
