import { Model } from 'sequelize';


export interface PostMediasInterface {
  postId: number;
  mediaId: number;
}
export default (sequelize: any, DataTypes: any) => {
  class PostMedias extends Model<PostMediasInterface> {

    static associate(models: any): void {
      PostMedias.belongsTo(models.Post, {
        onDelete: 'CASCADE',
        foreignKey: 'post_id',
        // as: 'media'    
      });
      PostMedias.belongsTo(models.Media, {
        onDelete: 'CASCADE',
        foreignKey: 'media_id',
        // as: 'media'
      });
    }
  }
  PostMedias.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      mediaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'medias',
          key: 'id',
        },
      },
    },

    {


      sequelize,
      modelName: 'PostMedia',
      tableName: 'post_medias',
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
  return PostMedias;
};
