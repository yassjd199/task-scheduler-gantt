const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class Tasks extends Model {
}

Tasks.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        progress: {
            type: DataTypes.INTEGER,
        },
        isCritical: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isMilestone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        resources: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            defaultValue: [],
        },
        earlyStart: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        earlyEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lateStart: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lateEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'Task',
        timestamps: true,
    }
);

module.exports = Tasks;
