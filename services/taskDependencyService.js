const {TaskDependency} = require('../models');

// Service to add a task dependency
const addTaskDependencyService = async (taskId, dependsOnTaskId) => {
    // Check if dependency already exists
    const existingDependency = await TaskDependency.findOne({
        where: {taskId, dependsOnTaskId}
    });

    if (existingDependency) {
        throw new Error(`Dependency between task ${taskId} and task ${dependsOnTaskId} already exists`);
    }

    // Create new dependency
    return await TaskDependency.create({taskId, dependsOnTaskId});
};

// Service to delete a task dependency
const deleteTaskDependencyService = async (taskId, dependsOnTaskId) => {
    const result = await TaskDependency.destroy({
        where: {taskId, dependsOnTaskId}
    });
    if (result === 0) {
        throw new Error(`Dependency between task ${taskId} and task ${dependsOnTaskId} not found`);
    }
};

// Service to get all dependencies for a specific task
const getTaskDependenciesService = async (taskId) => {
    const dependencies = await TaskDependency.findAll({
        where: {taskId},
        attributes: ['dependsOnTaskId'], // Only return the dependsOnTaskId
    });
    return dependencies.map(dep => dep.dependsOnTaskId); // Extract the IDs
};

module.exports = {
    addTaskDependencyService,
    deleteTaskDependencyService,
    getTaskDependenciesService,
};
