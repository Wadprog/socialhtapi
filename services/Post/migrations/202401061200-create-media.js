
/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('medias', {
       id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      original: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      large: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      small: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiny: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade'
        },
      },

      height: {
        type: DataTypes.STRING,
        allowNull: false
      },
      width: {
        type: DataTypes.STRING,
        allowNull: true
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
          onDelete: 'cascade'
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medias');
  },
};
