module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommunityRoles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },

      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      role_access_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CommunityRoles');
  },
};
