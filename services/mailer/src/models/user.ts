'use strict';
import { Model, Sequelize } from 'sequelize';
import { UserInterface } from '@webvital/micro-common';

type UserType = Omit<UserInterface, 'password' | 'emailVerificationkey'>

export default (sequelize: Sequelize, DataTypes: any) => {

  class User extends Model<UserType, UserType> {

    static associate(models: Model[]) {


    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: false
  });
  return User;
};