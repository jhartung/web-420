/*
============================================
; Title: Assignment 6.2
; Author: Professor Krasso
; Date: 21 April 2022
; Modified By: Joel Hartung
; Description: hartung-user.js
; Code Attribution: Additional code from the Assignment 6 document
;============================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// userschema
let userSchema = new Schema({
    userName: { type: String, required: true },
    Password: { type: String, required: true },
    emailAddress: { type: Array, required: true }
});

// exports User model
module.exports = mongoose.model('User', userSchema);
