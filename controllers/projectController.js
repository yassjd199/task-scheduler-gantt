const {
    createProjectService,
    getSingleProjectService,
    updateProjectService,
    deleteProjectService, getAllprojectsService
} = require('../services/projectService');


createProjectController = async (req, res) => {
    try {
        const projectData = req.body;
        const newProject = await createProjectService(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

getAllProjectsController = async (req, res) => {
    try {
        const projects = await getAllprojectsService();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

getSingleProjectController = async (req, res) => {
    try {
        const {projectId} = req.params;
        const project = await getSingleProjectService(projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

updateProjectController = async (req, res) => {
    try {
        const {projectId} = req.params;
        const projectData = req.body;
        const updatedProject = await updateProjectService(projectId, projectData);
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

deleteProjectController = async (req, res) => {
    try {
        const {projectId} = req.params;
        await deleteProjectService(projectId);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


module.exports = {
    getAllProjectsController,
    getSingleProjectController,
    updateProjectController,
    deleteProjectController,
    createProjectController,
}