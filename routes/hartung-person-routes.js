/*
============================================
; Title: Assignment 5.2
; Author: Professor Krasso
; Date: 14 April 2022
; Modified By: Joel Hartung
; Description: hartung-person-routes.js
; Code Attribution: Additional code from the Assignment 5 document
;============================================
*/

// Require statements

const express = require('express');
const router = express.Router();
const Person = require ('../models/hartung-person');


/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an array of person objects.
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/persons', (req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: API for adding a new person document to MongoDB Atlas
 *     summary: Creates a new person document
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName: 
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate: 
 *                 type: string
 *                 
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/persons', async(req, res) => {
    try {
        let newPerson = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            roles: req.body.roles, 
            dependents: req.body.dependents, 
            birthDate: req.body.birthDate
        };

        Person.create(newPerson, function(err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;