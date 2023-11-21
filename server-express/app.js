require('dotenv').config(); 

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
require('./setupMongo')(); // This will use the DB_URI from your .env file

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", require("./routes/auth"));
app.use("/toDo", require("./routes/toDo"));

module.exports = app;
