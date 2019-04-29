'use strict'

var Project = require('../models/projects')

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
        project.image = null;

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
    }
    
}

module.exports = controller