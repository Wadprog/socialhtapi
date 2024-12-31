
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,   
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
