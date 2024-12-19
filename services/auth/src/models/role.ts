import { Model, Sequelize } from 'sequelize';
interface RoleInterface {
  id: number;
  name: string;
  description: string;
  accessLevel: number;
}

export default (sequelize: Sequelize, DataTypes: any) => {

  class Role extends Model<RoleInterface> {

    static associate(models: any) {

      Role.hasMany(models.User, {
        foreignKey: 'role_id',
      });

    }
  }
  Role.init({

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accessLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true,
    timestamps: false
  });
  return Role;
};