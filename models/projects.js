'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema; //Object schema for creating the models

var ProjectSchema = schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String], //String type array.
    image: String
})

module.exports = mongoose.model('Project', ProjectSchema); 
//Mongoose.model takes two parameters, the first one is the collection in the
//database, the second one is the schema model that is going to bee exported.
//The collection name as parameter is converted to lowercase and pluralized. 
//So Projects => projects
