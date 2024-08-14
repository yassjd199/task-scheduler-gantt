const db = require("../config/database");

const Project = require("./Projects");
const Task = require("./Tasks");
const TaskDependency = require("./TaskDependencies");


Project.hasMany(Task, {foreignKey: 'projectId'});
Task.belongsTo(Project, {foreignKey: 'projectId', onDelete: 'CASCADE'});

TaskDependency.belongsTo(Task, {foreignKey: 'taskId', onDelete: 'CASCADE'});
TaskDependency.belongsTo(Task, {foreignKey: 'dependsOnTaskId', onDelete: 'CASCADE'});

db.sync({alter: true})
    .then(() => {
        console.log("Database schema updated!");
    })
    .catch(error => {
        console.error("Error updating database schema:", error);
    });

module.exports = {
    Project,
    Task,
    TaskDependency,
};
