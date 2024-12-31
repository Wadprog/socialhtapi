import { Model } from 'sequelize';

interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export default (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface>  {

    static associate(models: any) {
      User.hasMany(models.Post, {
        onDelete: 'CASCADE',
      });
    
      User.belongsToMany(models.Community, {
        through: 'community_users',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
  return User;
};
