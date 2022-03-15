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

http.createServer(app).listen(app.get("port"), function () {
    console.log(`Application started and listening on port ${app.get('port')}`);
})