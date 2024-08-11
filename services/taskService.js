// services/taskService.js
const {Task} = require('../models');

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

module.exports = {
    getAllTasksService,
    getSingelTaskService,
    deleteTaskService,
    updateTaskService,
    createTaskService,
};
