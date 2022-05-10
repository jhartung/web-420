/*
============================================
; Title: app.js
; Author: Professor Krasso
; Date: 15 March 2022
; Modified By: Joel Hartung
; Description: app.js
; Code Attribution: Additional code from WEB 420 Assignment documentation & WEB 420 Course Repository
;===========================================
*/

var express = require("express");
var http = require("http");
var swaggerUiExpress = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");
var mongoose = require("mongoose");
var composerAPI = require("./routes/hartung-composer-routes");
var personAPI = require("./routes/hartung-person-routes");
var userAPI = require("./routes/hartung-session-routes")
var customerAPI = require("./routes/hartung-node-shopper-routes")
var teamAPI = require("./routes/hartung-team-routes")

// database information
var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://admin:cHYll5RqSlCIrNHA@buwebdev-cluster-1.gzdv5.mongodb.net/web420DB?retryWrites=true&w=majority";

var app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

const options = {
    definition: {
        openapi: "3.0.0", 
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification
}

const openapiSpecifications = swaggerJsdoc(options);

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(openapiSpecifications));
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);
app.use('/api', teamAPI);

//Mongoose connection information
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connected error:"));
db.once("open", function () {
    console.log("Application connected to MongoDB instance");
});


/*
http.createServer(app).listen(app.get("port"), function () {
    console.log(`Application started and listening on port ${app.get('port')}`);
})
*/
http:http.createServer(app).listen(app.get("port"), function() {console.log("Application started on port " + app.get("port"))});