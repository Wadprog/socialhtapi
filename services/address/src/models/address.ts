/* eslint-disable import/no-import-module-exports */

import { Model, Sequelize } from 'sequelize';

export interface AddressInterface {
  id: number;
  cityId: number;
  userId: number;
  addressTypeId: number;
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Address extends Model<AddressInterface> {

    static associate(models: any): void {
      Address.belongsTo(models.City);
      Address.belongsTo(models.User);
      Address.belongsTo(models.AddressType);
    }
  }
  Address.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      addressTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'address_types',
          key: 'id',
        },
      },
    },

    {

      sequelize,
      modelName: 'Address',
      tableName: 'addresses',
      underscored: true,
    }
  );
  return Address;
};
