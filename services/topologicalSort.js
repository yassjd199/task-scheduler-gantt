// scheduleService.js
const {getTasksForProjectService} = require('./taskService');
const {getTaskDependenciesService} = require('./taskDependencyService');


async function dfs(curTask, visited, result, stack, adj, tasksMap) {
    const curTaskId = curTask.id;
    visited[curTaskId] = 1;
    stack[curTaskId] = true;
    for (const depTaskId of adj[curTaskId]) {
        if (visited[depTaskId] === 1) {
            throw new Error(`Cycle detected involving task ID: ${depTaskId}`);
        }

        if (visited[depTaskId] === 0) {
            await dfs(tasksMap[depTaskId], visited, result, stack, adj, tasksMap);
        }
    }

    result.push(curTask);
    visited[curTaskId] = 2;
    stack[curTaskId] = false;
}

async function runTopologicalSort(projectId) {
    const tasks = await getTasksForProjectService(projectId);
    const visited = {};
    const stack = {};
    const result = [];
    const adj = {};
    const tasksMap = {};


    for (const task of tasks) {
        visited[task.id] = 0;
        stack[task.id] = false;
        adj[task.id] = [];
        tasksMap[task.id] = task;
    }

    // Build adjacency list based on task dependencies
    for (const task of tasks) {
        const dependencies = await getTaskDependenciesService(task.id);
        for (const dep of dependencies) {
            adj[dep.dependsOnTaskId].push(task.id);
        }
    }

    for (const task of tasks) {
        if (visited[task.id] === 0) {
            //console.log(task.id);
            await dfs(task, visited, result, stack, adj, tasksMap);
        }
    }
    // for (let x of result) console.log(x.id);
    return result.reverse();  // Reverse to get the correct topological order
}


async function main() {
    try {
        const projectId = 1;
        const sortedTasks = await runTopologicalSort(projectId);

        const cleanOutput = sortedTasks.map(task => {
            return {
                id: task.dataValues.id,
                name: task.dataValues.name,
                startDate: task.dataValues.startDate,
                endDate: task.dataValues.endDate,
            };
        });

        console.log('Topologically sorted tasks:', cleanOutput);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = runTopologicalSort;
