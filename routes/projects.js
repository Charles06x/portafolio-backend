'use strict'

var express = require('express');
var ProjectController = require('../controllers/projects');

var router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/get-project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getAllProjects);

module.exports = router;