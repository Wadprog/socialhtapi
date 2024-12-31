/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('community_users', {
        community_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'communities',
          key: 'id',
        },
      },

       user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('community_users');
  },
};
