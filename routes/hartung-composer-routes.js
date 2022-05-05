/*
============================================
; Title: Composer API (Assignment 4.2 / Assignment 8.2)
; Author: Professor Krasso
; Date: 7 April 2022
; Updated: 5 May 2022
; Modified By: Joel Hartung
; Description: hartung-composer-routes.js
; Code Attribution: Additional code from the Assignment 4  and Assignment 8 document
;============================================
*/

// Require statements

const express = require('express');
const router = express.Router();
const Composer = require ('../models/hartung-composer');


/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: Array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
*               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/composers', async(req, res) => {
    try {
        let composer =  new Composer ({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        Composer.create(composer, function(err, addComposer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(addComposer);
                res.json(addComposer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API to update a composer by id
 *     summary: updates a composer by id
 *     parameters: 
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({"_id": req.params.id}, function(err, composer) {
            if (composer) {
                composer.set({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                })
                composer.save(function(err, savedComposer) {
                    if (err) {
                        console.log(err);
                        res.json(savedComposer);
                    } else {
                        console.log(savedComposer);
                        res.json(savedComposer);
                    }
                })
            } else if (!composer) {
                res.status(401).send({
                    "message": `Invalid composerID ${err}`
                });
            } else {
                console.log(err);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
        })
    }
});


/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposerById
 *     description: API to delete a composer by id
 *     summary: deletes a composer by id
 *     parameters: 
 *       - name: id
 *         in: path
 *         required: true
 *         scheme: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/composers/:id', async(req, res) => {
    try {
        Composer.findByIdAndDelete({ "_id": req.params.id }, function(err, composer) {
            if (composer) {
                res.json(composer);
            } else {
                console.log(err);
                res.status(502).send({
                    "message": `MongoDB Exception ${err}`
                })
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
        })
    }
});

module.exports = router;