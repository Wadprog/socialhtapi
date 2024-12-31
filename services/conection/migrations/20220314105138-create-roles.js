module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      role_access_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  },
};
