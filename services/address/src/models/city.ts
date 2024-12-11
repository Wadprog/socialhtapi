
import { Model, Sequelize } from 'sequelize'
import { CityInterface } from '@webvital/micro-common'
export default (sequelize: Sequelize, DataTypes: any) => {
  class City extends Model<CityInterface, {}> {

    static associate(models: Model[]) {
      // @ts-ignore
      this.belongsTo(models.State, {
        foreignKey: 'state_id'
      })
      // @ts-ignore
      this.hasMany(models.Address, {
        foreignKey: 'city_id'
      })
    }
  }
  City.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      initials: { type: DataTypes.STRING, allowNull: false },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id',
        },
      },

    },
    {
      sequelize,
      modelName: 'City',
      tableName: 'cities',
      underscored: true,
      timestamps: false,
    }
  )
  return City
}
