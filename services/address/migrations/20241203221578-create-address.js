'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        address_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'address_types',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        city_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'cities',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('address')
  },
}
