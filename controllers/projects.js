'use strict'

var Project = require('../models/projects')

var fs = require('fs');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'home'
        }); 
    },

    test: function(req, res){
        return res.status(200).send({
        message: 'test'
        }); 
    },

    saveProject: function(req, res){
        var project = new Project();
        

        var params = req.body

        project.name = params.name;
        project.description = params.description;
        project.year = params.year;
        project.category = params.category;
        project.langs = params.langs;
        if(req.files){
            var filePath = req.files.image.path;
            var fileName = filePath.split('\\');
            fileName = fileName[1];
            if(ext == 'jpg' || ext == 'gif' || ext == 'jpeg' || ext == 'png'){
                project.image = fileName;
            }else{
                project.image = null;
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: "Invalid extension"});
                })
            }
            
        }else{
            project.image = null;
        }
        

        project.save((err, projectStoraged) => {
            if(err) return res.status(500).send({message: "An error has occurred while saving document.", error: err});

            if(!projectStoraged) return res.status(404).send({message: "Project not saved."})

            return res.status(200).send({project: projectStoraged})
        });

    },

    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: "No ID submitted."})

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message: "An error has occurred while saving document.", error: err});

            if(!project) return res.status(404).send({message: "Project not found."});

            return res.status(200).send({project: project});
        })
    },

    getAllProjects: function(req, res) {
        Project.find({category: "AI", year: 2018}).sort('year').exec((err, projects) => { 
            if (err) return res.status(500).send({message: "An error has ocurred while fetching data"});

            if(!projects) return res.status(404).send({message: "There are no projects at the moment."});

            return res.status(200).send({projects});
        })
    },

    updateProject: function(req, res) {
        var projectId = req.params.id;
        var newProject = req.body;

        Project.findByIdAndUpdate(projectId, newProject, {new: true}, (err, projectUpdated) => { //new: true is for returning the updated project with the new data.
            if(err) return res.status(500).send({message: "An error has ocurred."});

            if(!projectUpdated) return res.status(404).send({message: "Project to update not found."});

            return res.status(200).send({project: projectUpdated});
        })
    },

    deleteProject: function(req, res) {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => { //new: true is for returning the updated project with the new data.
            if(err) return res.status(500).send({message: "An error has ocurred.", error: err});

            if(!projectDeleted) return res.status(404).send({message: "Project to delete not found."});

            return res.status(200).send({project: projectDeleted});
        })
    }, 

    uploadImgToProject: function(req, res) {
        var projectId = req.params.id;
        
        if(req.files){
            var filePath = req.files.image.path;
            var fileName = filePath.split('\\');
            fileName = fileName[1];
            var ext = fileName.split('.');
            if(ext == 'jpg' || ext == 'gif' || ext == 'jpeg' || ext == 'png'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: "An error has ocurred.", error: err});

                    if(!projectUpdated) return res.status(404).send({message: "Project not found."});

                    return res.status(200).send({
                        project: projectUpdated
                    })
                })
            }else{
                fs.unlink(filePath);
                return res.status(406).send({message: "Invalid extension."});
            }
            
        }else{
            return res.status(500).send({message: "No image was submitted."});
        }
    }
    
}

module.exports = controller