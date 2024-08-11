const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');

class Project extends Model {}

Project.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize: db,  // Reference to the database connection
        modelName: 'Project',  // Name of the model
        timestamps: true,  // Automatically add createdAt and updatedAt timestamps
    }
);

module.exports = Project;
