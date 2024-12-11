'use strict'
import { Model, Sequelize } from 'sequelize'
import { CountryInterface } from '@webvital/micro-common'

export default (sequelize: Sequelize, DataTypes: any) => {
  class Country extends Model<CountryInterface, {}> {

    static associate(models: Model[]) {
      // @ts-ignore
      this.hasMany(models.State, {
        foreignKey: 'country_id',
      })
    }
  }
  Country.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      initials: { type: DataTypes.STRING, allowNull: false },
      flag: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Country',
      tableName: 'countries',
      underscored: true,
      timestamps: false,
    }
  )
  return Country
}
