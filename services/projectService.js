const {Project} = require("../models/index");


createProjectService = async (projectData) => {
    try {
        const newPorject = await Project.create(projectData);
        return newPorject;

    } catch (error) {
        throw new Error(error);
    }
}


getAllprojectsService = async () => {
    try {
        const projects = await Project.findAll();
        return projects;

    } catch (error) {
        throw new Error(error);
    }
}

getSingleProjectService = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId);
        return project;

    } catch (error) {
        throw new Error(error);
    }
}

updateProjectService = async (projectId, projectData) => {
    try {
        const [updated] = await Project.update(projectData, {where: {id: projectId}});
        if (updated) {
            return await Project.findByPk(projectId);
        } else {
            throw new Error(`Cannot update project: ${projectId}`);
        }

    } catch (error) {
        throw new Error(error);
    }
}


deleteProjectService = async (projectId) => {
    try {
        const deleted = await Project.destroy({where: {id: projectId}});
        if (deleted) {
            return true;
        } else throw new Error(`Cannot delete project: ${projectId}`);
    } catch (error) {
        throw new Error(error);
    }


}


module.exports = {
    createProjectService,
    getAllprojectsService,
    getSingleProjectService,
    updateProjectService,
    deleteProjectService
}