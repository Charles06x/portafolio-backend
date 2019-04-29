# portafolio-backend
API for creating and modifying projects to show as a portafolio.

This API intends to manage the methods for creating, editing, updating and deleting projects in a NoSQL DB (MongoDB).

The projects have the following structure:
 ``` 
  {
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String]
    image: String
  } 
```
  
The endpoints are the following:
 - /api/save-projects            post method for creating new projects to the database collection.
 - /api/get-project/:id          get method for getting a specific project using the id.
 - /api/projects                 get method for listing all projects.
 - /api/update-project/:id       put method for editing a specific project.
 - /api/image-to-project/:id     put method fot adding an image to a project given an id.
 - /api/delete-project/:id       delete method for deleting a project given an id.
 
The extension of files is validated before performing the methods into database.

To launch the API use the command 
``` 
npm start 
```

And the api will be running in localhost:4500
