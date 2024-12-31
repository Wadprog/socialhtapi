import { Model } from 'sequelize';

export interface KoremInterface {
  userId: number;
  postId: number;
  createdAt: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class Korem extends Model<KoremInterface> {

    static associate(models: any): void {
      Korem.belongsTo(models.User);
      Korem.belongsTo(models.Post);
    }
  }
  Korem.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'posts',
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
      modelName: 'Korem',
      tableName: 'korems',
      underscored: true,
      updatedAt: false,
    }
  );
  return Korem;
};
