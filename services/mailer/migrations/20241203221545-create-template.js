'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('templates', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      requiredFields: {
        type: DataTypes.JSON,
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('templates')
  },
}
