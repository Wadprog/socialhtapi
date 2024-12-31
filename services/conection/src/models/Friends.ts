import { Model } from 'sequelize';

export interface FriendInterface {
  userOneId: number;
  userTwoId: number;
  createdAt: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class Friend extends Model<FriendInterface> {

    static associate(models: any): void {
      Friend.belongsTo(models.User, { foreignKey: 'user_one_id' });
      Friend.belongsTo(models.User, { foreignKey: 'user_two_id' });
    }
  }
  
  Friend.init(
    {

      userOneId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      userTwoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },

    {
      sequelize,
      modelName: 'Friend',
      tableName: 'friends',
      underscored: true,
      updatedAt: false,
    }
  );
  return Friend;
};
