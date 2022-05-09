/*
============================================
; Title: Assignment 9 - Capstone API
; Author: Professor Krasso
; Date: 9 May 2022
; Modified By: Joel Hartung
; Description: hartung-team-routes.js
; Code Attribution: Code requirements from Assignment 9 documentation
;============================================
*/

// Require statements

const express = require('express');
const router = express.Router();
const Team = require ('../models/hartung-team');


/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of team objects.
 *     summary: returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: Array of team documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/teams', async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for assigning a player to a team
 *     summary: Assigns a player to a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team document id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary: 
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({"_id": req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.status(200).send({
                    "message": "Player assigned to team"
                })
            
                const newPlayer = {
                    firstName: req.body.firstName, 
                    lastName: req.body.lastName, 
                    salary: req.body.salary, 
                }

                team.players.push(newPlayer);
                team.save();
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning all players by team ID
 *     summary: returns all players by team ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401': 
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({"_id": req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team.players);
                res.json(team.players);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API to delete a team by id
 *     summary: deletes a team by id
 *     parameters: 
 *       - name: id
 *         in: path
 *         required: true
 *         scheme: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401': 
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/teams/:id', async(req, res) => {
    try {
        Team.findByIdAndDelete({ "_id": req.params.id }, function(err, team) {
            if (team) {
                res.json(team);
            } else {
                console.log(err);
                res.status(501).send({
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