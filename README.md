# Wiki-API

This web app is a RESTful API that allows for the creation, retrieval, update, and deletion of articles stored in a MongoDB database. It is built using Node.js and the Express.js framework, with EJS for HTML templating and Body Parser for request body parsing. The MongoDB database is accessed and managed through Mongoose, an Object Document Mapper (ODM) for MongoDB and Node.js. With its well-defined routes and functionality, the app provides a simple and effective way to interact with the database.

## Usage
1. Start the server by running the code file on a Node.js environment
2. Use any API client (e.g. Postman) to send requests to the API
3. The API will respond with data in JSON format
4. Endpoints listed in the API section can be used for performing various actions on articles

## Endpoints

- **GET** /articles - Retrieves all articles
- **POST** /articles - Creates a new article
- **DELETE** /articles - Deletes all articles

- **GET** /articles/:articleTitle - Retrieves a specific article by its title
- **PUT** /articles/:articleTitle - Updates a specific article by its title
- **PATCH** /articles/:articleTitle - Partially updates a specific article by its title
- **DELETE** /articles/:articleTitle - Deletes a specific article by its title

## Technology Stack
- **Node.js**: A server-side JavaScript environment
- **Express.js**: A Node.js framework for building web applications
- **EJS**: A templating engine for generating HTML views
- **Body Parser**: A middleware for parsing incoming request bodies
- **MongoDB**: A cross-platform document-oriented database
- **Mongoose**: An Object Document Mapper (ODM) for MongoDB and Node.js