import { Model } from 'sequelize';
// import config from 'config';

// const tinySize = config.get('tinySize');
// const smallSize = config.get('smallSize');
// const mediumSize = config.get('mediumSize');

export interface MediaInterface {
  id: number;
  original: string;
  large: string;
  medium: string;
  small: string;
  tiny: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Media extends Model<MediaInterface> {

    static associate(models: any): void {
      Media.belongsTo(models.User);
      Media.belongsToMany(models.Post, {
        through: 'post_medias',
        foreignKey: 'media_id',
        as: 'media',
      });
    }
  }
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      original: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      large: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      small: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiny: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      // hooks: {
      //   beforeSave: (record) => {
      //     const { tiny, small, medium, original } = record;

      //     record.medium =
      //       medium !== undefined
      //         ? medium
      //         : original.replace(/\upload\//g, `upload/${mediumSize}/`);
      //     record.small =
      //       small !== undefined
      //         ? small
      //         : original.replace(/\upload\//g, `upload/${smallSize}/`);
      //     record.tiny =
      //       tiny !== undefined
      //         ? tiny
      //         : original.replace(/\upload\//g, `upload/${tinySize}/`);
      //   },
      // },

      sequelize,
      modelName: 'Media',
      tableName: 'medias',
      underscored: true,
      updatedAt: false,
      createdAt: false,
    }
  );
  return Media;
};
