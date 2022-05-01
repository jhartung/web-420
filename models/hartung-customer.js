/*
============================================
; Title: Assignment 7.2
; Author: Professor Krasso
; Date: 29 April 2022
; Modified By: Joel Hartung
; Description: hartung-customer.js
; Code Attribution: Additional code from the Assignment 4 document
;============================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// lineItemSchema
let lineItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// invoiceSchema
let invoiceSchema = new Schema({
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    dateCreated: { type: String, required: true },
    dateShipped: { type: String, required: true },
    lineItems: [lineItemSchema]
});

// customerSchema
let customerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    invoices: [invoiceSchema]
});

// exports User model
module.exports = mongoose.model('Customer', customerSchema);
