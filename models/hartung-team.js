/*
============================================
; Title: Assignment 9.2 Capstone
; Author: Professor Krasso
; Date: 9 May 2022
; Modified By: Joel Hartung
; Description: hartung-team.js
; Code Attribution: Guidelines from assignment 9 documentation
;============================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// playerSchema
let playerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salary: { type: Number, required: true }
});

// teamModel
let teamModel = new Schema({
    name: { type: String, required: true },
    mascot: { type: String, required: true },
    players: [playerSchema],
});

// exports Team model & Player schema
module.exports = mongoose.model('Team', teamModel);
