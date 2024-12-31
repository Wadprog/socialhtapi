import { Model, Sequelize } from 'sequelize';

import { UserInterface as UInterface } from '@webvital/micro-common';

interface UserInterface extends Omit<UInterface, 'password' | 'emailVerificationKey'> {
  gender: string;
  bio?: string;
  online: boolean;
  profilePicture?: string;
  searchVector?: any;
  createdAt: Date;
  amountOfFollower: number;
  amountOfFollowing: number;
  amountOfFriend: number;
  dob: string;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserInterface> { }

  User.init(
    {
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
      amountOfFollower: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      amountOfFollowing: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      amountOfFriend: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        defaultValue: 'Not specified',
        validate: {
          customValidator: (value: string) => {
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
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      searchVector: {
        type: DataTypes.TSVECTOR,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      timestamps: false,
    }
  );
  return User;
};
