module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('post_medias', {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'posts',
          key: 'id',
          onDelete: 'cascade',
        },
      },
      media_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'medias',
          key: 'id',
          onDelete: 'cascade',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post_medias');
  },
};
