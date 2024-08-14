const express = require('express');
const path = require('path');
const logger = require('morgan');

// Import routes
const projectRouter = require('./routes/projectsRoute');
const taskRouter = require('./routes/tasksRoute');
const taskDependencyRouter = require('./routes/taskDependenciesRoute');

// Port configuration
const PORT = process.env.PORT || 3000;


// Import database configuration

const db = require('./config/database');
//const {Model} = require("sequelize");
//const Task = require("./models/Tasks");
const app = express();

/* for testing purposes remove later    */


/*  */

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/v1', projectRouter);
app.use('/api/v1', taskRouter);
app.use('/api/v1', taskDependencyRouter);


// Database connection
(async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;
