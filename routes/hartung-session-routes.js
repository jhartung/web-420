/*
============================================
; Title: Assignment 6.2
; Author: Professor Krasso
; Date: 21 April 2022
; Modified By: Joel Hartung
; Description: hartung-session-routes.js
; Code Attribution: Additional code from the Assignment 6 document
;============================================
*/

// Require statements
const express = require('express');
const router = express.Router();
const User = require ('../models/hartung-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

// signup operation

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/signup', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
        const newRegisteredUser = {
            userName: req.body.userName,
            Password: hashedPassword, 
            emailAddress: req.body.emailAddress
        };

        User.findOne({"userName": req.body.userName}, function(err, user){
            if (err) {
                res.status(501).send({
                    "message": `MongoDB Exception ${err}`
                })
            } else {
                if (!user) {
                    User.create(newRegisteredUser, function (err, user) {
                        if (err) {
                            res.status(501).send({
                                "message": `MongoDB Exception ${err}`
                            })
                        } else {
                            res.status(200).send({
                                "message": "Registered User"
                            })
                            res.json(user);
                        }
                    })
                } else {
                    if (user) {
                        res.status(401).send({
                            "message": "Username is already in use"
                        })
                    }
                }
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
        })
    }
 })


// login operation

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     description: API for logging in
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/login", async(req, res) => {
    try {
        User.findOne({"userName": req.body.userName}, function(err, user) {
            if (err) {
                res.status(501).send({
                    "message": `MongoDB Exception ${err}`
                })
            } else {
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);

                    if (passwordIsValid) {
                        res.status(200).send({
                            "message": "User logged in"
                        })
                    } else {
                        res.status(401).send({
                            "message": "Invalid username and/or password"
                        })
                    }
                } else {
                    if (!user) {
                        res.status(401).send({
                            "message": "Invalid username and/or password"
                        })
                    }
                }
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
        })
    }
})

module.exports = router;