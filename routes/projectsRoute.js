const express = require('express');

const router = express.Router();

const {
    createProjectController,
    getAllProjectsController,
    getSingleProjectController,
    deleteProjectController,
    updateProjectController
} = require('../controllers/projectController');
const {mountpath} = require("express/lib/application");


router.post('/projects', createProjectController).get('/projects', getAllProjectsController);
router.delete('/projects/:projectId', deleteProjectController);
router.put('/projects/:projectId', updateProjectController);
router.get('/projects/:projectId', getSingleProjectController);


module.exports = router;