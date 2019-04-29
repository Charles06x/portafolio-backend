'use strict'

var express = require('express');
var ProjectController = require('../controllers/projects');

var router = express.Router();

//Set the middleware to handle files in requests.
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './imgs'})

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);

//Routes for projects methods.
router.post('/save-project', multipartMiddleware, ProjectController.saveProject);
router.get('/get-project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getAllProjects);
router.put('/update-project/:id', ProjectController.updateProject);
router.delete('/delete-project/:id', ProjectController.deleteProject);
router.put('/image-to-project/:id', multipartMiddleware,ProjectController.uploadImgToProject);

module.exports = router;