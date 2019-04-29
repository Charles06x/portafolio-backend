'use strict'

var express = require('express');   //Express object
var bodyParser = require('body-parser');    //Object body-parser

var app = express();

//Routes' files
var project_routes = require('./routes/projects');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));  //BodyPArser configuration
app.use(bodyParser.json()); //Any petition will be parsed to json

//Cors

//Routes
app.use('/api', project_routes);

//Export this module.
module.exports = app;