/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';
import { TemplateInterface } from '../schema/template.schema';

export default (sequelize: any, DataTypes: any) => {
  class TemplateMessage extends Model<TemplateInterface> { }
  TemplateMessage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      requiredFields: {
        type: DataTypes.JSON,
        allowNull: false
      }

    },

    {

      sequelize,
      modelName: 'Template',
      underscored: true,
      tableName: 'templates',
      timestamps: false,
    }
  );
  return TemplateMessage;
};
