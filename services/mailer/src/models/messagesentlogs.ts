'use strict';
import { Model, Sequelize } from 'sequelize';

interface LogInterface {
    userId: number;
    templateId: number;
    sent: boolean;
    createdAt: Date;
}

export default (sequelize: Sequelize, DataTypes: any) => {

    class User extends Model<LogInterface> {

        static associate(models: Model[]) {


        }
    }
    User.init({
    
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
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'SentLog',
        tableName: 'sent_logs',
        underscored: true,
        updatedAt: false,

    });
    return User;
};