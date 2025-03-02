/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface InterestInterface {
  id: string;
  name: string;
  approved: boolean;
  accessible: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class Interest extends Model<InterestInterface> implements InterestInterface {
    id: string;

    name: string;

    approved: boolean;

    accessible: boolean;

    static associate(models: any): void {
      Interest.belongsToMany(models.User, { through: 'User_Interest' });
      Interest.belongsToMany(models.ForumCategory, {
        through: 'CategoryInterests',
      });
      Interest.belongsToMany(models.Discussion, {
        through: 'DiscussionInterests',
      });
      Interest.hasMany(models.Blog);
    }
  }
  Interest.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accessible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },

    {
      sequelize,
      modelName: 'Interest',
    }
  );
  return Interest;
};
