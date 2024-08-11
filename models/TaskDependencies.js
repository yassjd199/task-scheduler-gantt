const {DataTypes, Model} = require('sequelize');
const db=require('../config/database');


class TaskDependencies extends Model {}

TaskDependencies.init(
    {
        dependencyType: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
        modelName: 'TaskDependencies',
        timestamps: true,
    }
);


module.exports = TaskDependencies;
