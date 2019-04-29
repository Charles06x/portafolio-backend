'use strict'

var mongoose = require('mongoose') //Mongoose type object for connecting the database.
var app = require('./app');
var port = 4500;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Portafolio')
        .then(() => {
            console.log("Connection succesfull.");
            //Let's create the server
            app.listen(port, () => {
                console.log("Server is running in localhost:"+port);
            });
        })
        .catch(err => console.log(err));

// As this is a Promise, we can use then for log to console if connection works.
// And we can use .catch to log the error in case connection failed.