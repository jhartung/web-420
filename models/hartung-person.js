/*
============================================
; Title: Assignment 5.2
; Author: Professor Krasso
; Date: 14 April 2022
; Modified By: Joel Hartung
; Description: hartung-person.js
; Code Attribution: Additional code from the Assignment 5 document
;============================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// roleSchema
let roleSchema = new Schema({
    text: { type: String }
});

// dependentSchema
let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

// personSchema
let personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String }
});

// Export the composer module
module.exports = mongoose.model('Person', personSchema);