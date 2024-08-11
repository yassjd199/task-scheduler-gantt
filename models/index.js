
const db=require("../config/database");

const Project = require("./Projects");
const Task = require("./Tasks");
const TaskDependency = require("./TaskDependencies");


Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId', onDelete: 'CASCADE' });

TaskDependency.belongsTo(Task, { foreignKey: 'taskId', onDelete: 'CASCADE' });
TaskDependency.belongsTo(Task, { foreignKey: 'dependsOnTaskId', onDelete: 'CASCADE' });

db.sync({ force: false }).then(() => {
    console.log("Tables Created!");
}).catch(error => {
    console.error("Error creating tables:", error);
});

module.exports = {
    Project,
    Task,
    TaskDependency,
};
