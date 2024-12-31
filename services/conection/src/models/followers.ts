import { Model } from 'sequelize';

export interface FriendInterface {
  userId: number;
  followerId: number;
  createdAt: Date;
}
export default (sequelize: any, Sequelize: any) => {
  class Followers extends Model<FriendInterface> {

    static associate(models: any): void {
      Followers.belongsTo(models.User, { foreignKey: 'follower_id' });
      Followers.belongsTo(models.User, { foreignKey: 'followed_id' });
    }
  }

  Followers.init({
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      
    },
    followerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
   
  },

    {
      sequelize,
      modelName: 'Followers',
      tableName: 'followers',
      underscored: true,
      updatedAt: false,
    }
  );
  return Followers;
};
