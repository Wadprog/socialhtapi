'use strict';
import { Model, Sequelize } from 'sequelize';

interface LogInterface {
    id?: number;
    userId: number;
    templateId: number;
    sent: boolean;
}

export default (sequelize: Sequelize, DataTypes: any) => {

    class User extends Model<LogInterface> {

        static associate(models: Model[]) {


        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', key: 'id'
            }
        },

        templateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'templates', key: 'id'
            }
        },

        sent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        sequelize,
        modelName: 'SentLog',
        tableName: 'sent_logs',
        underscored: true,

    });
    return User;
};