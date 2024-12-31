/* eslint-disable import/no-import-module-exports */

import { Model, Sequelize } from 'sequelize';

interface AddressTypeInterface {
  id: number;
  description: string;
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class AddressType
    extends Model<AddressTypeInterface> {

    static associate(models: Model): void {
      //@ts-ignore
      AddressType.hasMany(models.Address);
    }
  }
  AddressType.init(
    {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          customValidator: (value: string) => {
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
    },

    {

      sequelize,
      modelName: 'AddressType',
      tableName: 'address_types',
      underscored: true,
      timestamps: false,
    }
  );
  return AddressType;
};
