import { Model } from 'sequelize';

interface CommunityInterface {
  id: number;
  communityType: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Community extends Model<CommunityInterface>  {

    static associate(models: any) {
      Community.hasMany(models.Post, {
        onDelete: 'CASCADE',
      });
    
      Community.belongsToMany(models.User, {
        through: 'community_users',
        onDelete: 'CASCADE',
      });
    }
  }
  Community.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      communityType: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      
    },
    {
      sequelize,
      modelName: 'Community',
      tableName: 'communities',
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
  return Community;
};
