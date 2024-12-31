/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface PostInterface {
  id: string;
  postText: string;
  privacyType: string;
  locked: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostInterface> {


    static associate(models: any): void {
      Post.belongsTo(models.User);
      Post.belongsTo(models.Community, { onDelete: 'CASCADE' });
      Post.hasMany(models.Media, {
        onDelete: 'CASCADE',
        foreignKey: 'post_id',

      });
      Post.hasMany(models.Post, { as: 'Comments' });
      Post.hasMany(models.Korem, {
        foreignKey: 'post_id',
        constraints: false,
      });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      postText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      privacyType: {
        type: DataTypes.STRING,
        defaultValue: 'public',
      },

      locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    {
      // hooks: {
      //   afterFind: (name, option) => {
      //     // console.log('\n\n\n Some thing ');
      //     // console.log({name, option});
      //   },
      // },
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
  return Post;
};
