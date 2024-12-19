import { Model, Sequelize } from 'sequelize';
import { UserInterface } from '@webvital/micro-common';

interface UserInterfaceSchema extends UserInterface { emailVerified: boolean, roleId: number, emailKeyExpires: Date }
export default (sequelize: Sequelize, DataTypes: any) => {

  class User extends Model<UserInterfaceSchema> {

    static associate(models: any) {
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });

      User.hasOne(models.Auth, {
        foreignKey: 'user_id',
      });

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
    emailVerificationKey: { type: DataTypes.STRING, allowNull: true, defaultValue: () => Math.floor(1000 + Math.random() * 9000) },
    emailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    emailKeyExpires: {
      type: DataTypes.DATE, allowNull: true,
      defaultValue: () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    },
    roleId: {
      type: DataTypes.INTEGER, allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
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