import { Model, Sequelize } from 'sequelize';
import {UserInterface } from '@webvital/micro-common';

interface UserInterfaceSchema extends UserInterface { emailVerified: boolean }
export default (sequelize: Sequelize, DataTypes: any) => {

  class User extends Model<UserInterfaceSchema> {

    static associate(models: Model[]) {


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
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    emailVerificationkey: { type: DataTypes.STRING, allowNull: false, defaultValue: () => Math.floor(1000 + Math.random() * 9000) },
    emailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: false
  });
  return User;
};