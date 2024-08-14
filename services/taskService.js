// services/taskService.js
const {Task, TaskDependency} = require('../models');
const {request} = require("express");


const getAllTasksService = async () => {
    return await Task.findAll();
};

const getSingelTaskService = async (Taskid) => {
    const task = await Task.findByPk(Taskid);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

const createTaskService = async (taskData) => {
    return await Task.create(taskData);
};

const updateTaskService = async (Taskid, taskData) => {
    const [updated] = await Task.update(taskData, {where: {id: Taskid}});
    if (updated) {
        return await Task.findByPk(Taskid);
    } else {
        throw new Error('Task not found');
    }
};

const deleteTaskService = async (Taskid) => {
    const deleted = await Task.destroy({where: {id: Taskid}});
    if (!deleted) {
        throw new Error('Task not found');
    }
};
const getTasksForProjectService = async (projectId) => {
    try {
        const tasks = await Task.findAll({
            where: {projectId}
        });
        return tasks;
    } catch (error) {
        throw new Error(`Error fetching tasks for project ${projectId}: ${error.message}`);
    }
};

async function getDependedTasksService(taskId) {
    return await TaskDependency.findAll({
        where: {dependsOnTaskId: taskId},
        //attributes: ['taskId']
    });
}


module.exports = {
    getAllTasksService,
    getSingelTaskService,
    deleteTaskService,
    updateTaskService,
    createTaskService,
    getTasksForProjectService,
    getDependedTasksService,
};
