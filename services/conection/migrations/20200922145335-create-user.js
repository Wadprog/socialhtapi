module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
     
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      amount_of_follower: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      amount_of_following: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      amount_of_friend: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,   
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        defaultValue: 'Not specified',
        validate: {
          customValidator: (value) => {
            if (!['f', 'm', 'Not specified'].includes(value)) {
              throw new Error(`${value} is not a valid option for gender`);
            }
          },
        },
      },

      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      search_vector: {
        type: DataTypes.TSVECTOR,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
