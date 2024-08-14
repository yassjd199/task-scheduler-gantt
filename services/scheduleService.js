const {Op} = require('sequelize');
const Task = require('../models/Tasks');
const {getTasksForProjectService} = require('./taskService');
const runTopologicalSort = require('./topologicalSort');
const {getDependedTasksService} = require('./taskService');
const {getTaskDependenciesService} = require('./taskDependencyService');

async function updateTaskDates(projectId, projectStartTime) {

    //for (let task of tasksList) console.log(task.id);


    // Step 2: Run topological sort on tasksList
    const sortedTasks = await runTopologicalSort(projectId);
    // for (let task of sortedTasks) console.log(task.id);


    // Step 3: Initialize earlyStart and earlyEnd
    for (const task of sortedTasks) {
        const taskDependencies = await getTaskDependenciesService(task.id);
        if (taskDependencies.length === 0) {
            //console.log(task.id);
            // No dependencies, set earlyStart and earlyEnd based on projectStartTime
            task.earlyStart = new Date(projectStartTime);
            task.earlyEnd = new Date(projectStartTime);
            task.earlyEnd.setDate(task.earlyEnd.getDate() + task.duration);
        } else {
            task.earlyEnd = null;
            task.earlyStart = null;
            //console.log(task.id);
        }
    }


    // Step 4: Update earlyStart and earlyEnd for tasks with dependencies
    for (const task of sortedTasks) {
        if (task.earlyStart && task.earlyEnd) {
            //console.log(task.id);
            continue; // Skip if earlyStart and earlyEnd are already set
        }

        const dependencies = await getTaskDependenciesService(task.id);
        if (dependencies.length > 0) {
            // console.log(task.id);
            // Calculate earlyStart as the max earlyEnd of its dependencies
            let maxEarlyEnd = new Date(projectStartTime);
            for (const dep of dependencies) {
                const depTask = await Task.findByPk(dep.dependsOnTaskId);
                if (depTask.earlyEnd > maxEarlyEnd) {
                    maxEarlyEnd = depTask.earlyEnd;
                }
            }

            task.earlyStart = new Date(maxEarlyEnd);
            // console.log(task.id, task.earlyStart);
            task.earlyEnd = new Date(maxEarlyEnd);
            task.earlyEnd.setDate(task.earlyEnd.getDate() + task.duration);
        }
    }


    // Step 5: Initialize lateStart and lateEnd for leaf tasks
    for (const task of sortedTasks.reverse()) {
        const dependedTasks = await getDependedTasksService(task.id);

        if (dependedTasks.length === 0) {
            // This is a leaf task
            //console.log(task.id);
            task.lateEnd = task.earlyEnd;
            task.lateStart = new Date(task.lateEnd);
            task.lateStart.setDate(task.lateStart.getDate() - task.duration);
        } else {
            //console.log(task.id);
            task.lateEnd = null;
            task.lateStart = null;
        }
    }
    //for (let task of sortedTasks) console.log(task.id); // sortedList remains reversed
    // Step 6: Update lateStart and lateEnd for non-leaf tasks
    for (const task of sortedTasks) {
        if (task.lateStart && task.lateEnd) {
            if ((task.earlyEnd.getTime() === task.lateEnd.getTime()) && (task.earlyStart.getTime() === task.lateStart.getTime())) {
                task.isCritical = true;
            }
            continue; // Skip if lateStart and lateEnd are already set
        }

        const dependedTasks = await getDependedTasksService(task.id);
        //console.log(dependedTasks);
        if (dependedTasks.length > 0) {
            // Calculate lateEnd as the minimum lateStart of its dependent tasks
            let minLateStart = new Date();
            minLateStart.setFullYear(minLateStart.getFullYear() + 1); // set it to a future date like next year
            for (const dep of dependedTasks) {
                const depTask = await Task.findByPk(dep.taskId);
                //console.log(depTask);
                if (depTask.lateStart < minLateStart) {
                    minLateStart = depTask.lateStart;
                }
            }

            task.lateEnd = new Date(minLateStart);
            task.lateStart = new Date(minLateStart);
            task.lateStart.setDate(task.lateStart.getDate() - task.duration);

            if ((task.earlyEnd.getTime() === task.lateEnd.getTime()) && (task.earlyStart.getTime() === task.lateStart.getTime())) {
                task.isCritical = true;
            }
        }
    }

    // Step 7: Update the tasks in the database with the calculated dates
    for (const task of sortedTasks) {
        await Task.update({
            isCritical: task.isCritical,
            earlyStart: task.earlyStart,
            earlyEnd: task.earlyEnd,
            lateStart: task.lateStart,
            lateEnd: task.lateEnd
        }, {
            where: {id: task.id}
        });
    }

    //console.log('Tasks updated with early and late dates.');
}

module.exports = updateTaskDates;
