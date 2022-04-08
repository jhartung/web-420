/*
============================================
; Title: Assignment 4.2
; Author: Professor Krasso
; Date: 7 April 2022
; Modified By: Joel Hartung
; Description: hartung-composer.js
; Code Attribution: Additional code from the Assignment 4 document
;============================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// composerSchema
let composerSchema = new Schema({
    firstName: { firstName:String },
    lastName: { lastName:String }
});

// Export the composer module
module.exports = mongoose.model('Composer', composerSchema);