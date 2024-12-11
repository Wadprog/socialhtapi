'use strict'
import { Model, Sequelize } from 'sequelize'
import { StateInterface } from '@webvital/micro-common'

export default (sequelize: Sequelize, DataTypes: any) => {
  class State extends Model<StateInterface, {}> {

    static associate(models: Model) {
      //@ts-ignore
      this.belongsTo(models.Country, {
        foreignKey: 'country_id',
      })
      //@ts-ignore
      this.hasMany(models.City, {
        foreignKey: 'state_id',
      })
    }
  }
  State.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      initials: { type: DataTypes.STRING, allowNull: false },
      country_id: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'State',
      tableName: 'states',
      underscored: true,
      timestamps: false,
    }
  )
  return State
}
