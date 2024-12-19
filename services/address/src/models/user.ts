import { Model, Sequelize } from 'sequelize';
import { UserInterface } from '@webvital/micro-common';

type UserType = Pick<UserInterface, 'id' >

export default (sequelize: Sequelize, DataTypes: any) => {

  class User extends Model<UserType> {
    static associate(models: any) {
    
      User.hasMany(models.Address);
    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: false
  });
  return User;
};