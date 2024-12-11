import { Model, Sequelize } from 'sequelize';
import { UserInterface } from '@webvital/micro-common';

type UserType = Pick<UserInterface, 'id' | 'firstName' | 'lastName'>

export default (sequelize: Sequelize, DataTypes: any) => {

  class User extends Model<UserType, UserType> {
    static associate(models: Model[]) {
      //@ts-ignore
      User.hasMany(models.Address);


    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: false
  });
  return User;
};