/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('korems', {
     user_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
        onDelete: 'cascade',
      },
    },
      post_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'id',
        onDelete: 'cascade',
      },
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('korems');
  },
};
