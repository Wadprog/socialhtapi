/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('communities', {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      community_type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('communities');
  },
};
