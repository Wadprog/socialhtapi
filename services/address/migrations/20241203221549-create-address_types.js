'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('address_types', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      description: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (
              ![
                'Work',
                'Home',
                'Billing',
                'Shipping',
                'School',
              ].includes(value)
            ) {
              throw new Error(`${value} is not a valid option for  address type`);
            }
          },
        },
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('address_types')
  },
}
