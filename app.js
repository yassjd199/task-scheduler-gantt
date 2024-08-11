var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// require routes

const projectRouter = require('./routes/projectsRoute');
const taskRouter = require('./routes/tasksRoute');
const taskDependencyRouter = require('./routes/taskDependenciesRoute');

//port
const PORT = 8000 || process.env.PORT;

// require database

const db = require('./config/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/api/v1', projectRouter);
app.use('/api/v1', taskRouter);
app.use('/api/v1', taskDependencyRouter);
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.get('/', (req, res, next) => {
    res.send('hello there ');
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
module.exports = app;
