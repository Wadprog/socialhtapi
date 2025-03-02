/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface NotificationInterface {
  id: string;
  to: string;
  message: string;
  type: string;
  view: boolean;
  entityName: string;
  entityId: number;
  notificationType: string;
  sound: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class Notification
    extends Model<NotificationInterface>
    implements NotificationInterface {
    id: string;

    to: string;

    message: string;

    type: string;

    view: boolean;

    entityId: number;

    entityName: string;

    notificationType: string;
    sound: boolean;

    static associate(models: any): void {
      Notification.belongsTo(models.User);
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      to: {
        type: DataTypes.UUID,
      },

      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entityName: {
        type: DataTypes.STRING,
      },

      entityId: {
        type: DataTypes.UUID,
      },
      sound: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      notificationType: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'notification_types',
          key: 'notification_slug',
        },
      },
      view: {
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
      modelName: 'Notification',
    }
  );
  return Notification;
};
