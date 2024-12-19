import { Model, Sequelize } from 'sequelize';
interface AuthInterface {
  userId: number;
  passwordResetKey: string;
  passwordResetExpires: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {

  class Auth extends Model<AuthInterface> {

    static associate(models: any) {

      Auth.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

    }
  }
  Auth.init({

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: {
        model: 'users',
        key:
          'id'
      },
      onDelete: 'CASCADE'
    },
    passwordResetKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Auth',
    tableName: 'auth',
    underscored: true,
    timestamps: false
  });
  return Auth;
};