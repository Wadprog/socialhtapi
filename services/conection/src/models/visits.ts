/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';
// Custom imports

interface VisitorInterface { }
export default (sequelize: any, DataTypes: any) => {
  class Visit extends Model<VisitorInterface> {


    static associate(models: any) {
      Visit.belongsTo(models.User, {
        as: 'Guest',
        constraints: false,
      });

      Visit.belongsTo(models.User, {
        as: 'Host',
        constraints: false,
      });
    }
  }
  Visit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      guestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'Visit',
      tableName: 'visits',
      underscored: true,
      updatedAt: false,
    }
  );
  return Visit;
};
