module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('posts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      post_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      privacy_type: {
        type: DataTypes.STRING,
        defaultValue: 'public',
      },

      locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      community_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'communities',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
          onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Users');
  },
};
