"use strict";

/* IMPORT MODULES */
const express               = require("express");
const PositionController    = require('../controller/PositionController');
const DAO                   = require("../db/DAO");
const { validationHandler } = require("../validator/validationHandler");
const { param }             = require('express-validator');
const { header }            = require('express-validator');
const { body }              = require('express-validator');

/* INITIALIZATION */
const router                = express.Router();
const dao                   = new DAO();
const positionController    = new PositionController(dao);

/**
 * API:
 *                GET /api/positions
 * =================================================
 */
router.get(
    "/positions", 
    [
        body().custom(value => {                                                /* [FROM API.md]: body should be empty                                                  */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    positionController.getPositions);

/**
 * API:
 *              POST /api/position
 * =================================================
 */
router.post(
    "/position",
    [
        header('Content-Type').equals('application/json'),                      /* [FROM API.md]: Request header has a line: Content-Type: application/json.            */
        body().custom(value => {                                                /* [FROM API.md]: all parameters should be defined (no optional parameters)             */
            if (value.positionID === undefined ||
                value.aisleID === undefined ||
                value.row === undefined ||
                value.col === undefined ||
                value.maxWeight === undefined ||
                value.maxVolume === undefined) {
                    throw new Error('Missing parameters');
                }
            return true;
        }),
        body('positionID').custom((value, { req }) => {                         /* [FROM API.md]: positionID is derived from (aisleID + row + col)                      */
            if (value !== req.body.aisleID + req.body.row + req.body.col) {
                throw new Error('positionID does not match other parameters');
            }
            return true;
        }),
        body('positionID').isLength({min: 12, max: 12}).isNumeric(),            /* [FROM API.md]: positionID is a 12 digits string                                      */
        body('aisleID').isLength({min: 4, max: 4}).isNumeric(),                 /* [FROM API.md]: aisleID is a 4 digits string                                          */
        body('row').isLength({min: 4, max: 4}).isNumeric(),                     /* [FROM API.md]: row is a 4 digits string                                              */
        body('col').isLength({min: 4, max: 4}).isNumeric(),                     /* [FROM API.md]: col is a 4 digits string                                              */
        body('maxWeight').isInt({gt: 0}),                                       /* [FROM API.md]: maxWeight is an integer value reasonably greater than zero            */
        body('maxVolume').isInt({gt: 0})                                        /* [FROM API.md]: maxVolume is an integer value reasonably greater than zero            */
    ],
    validationHandler,
    positionController.newPosition
);

/**
 * API:
 *            PUT /api/position/:positionID
 *  =================================================
 */
router.put(
    "/position/:positionID", 
    [
        param('positionID').isLength({min: 12, max: 12}).isNumeric(),           /* [FROM API.md]: positionID is a 12 digits string                                      */
        header('Content-Type').equals('application/json'),                      /* [FROM API.md]: Request header has a line: Content-Type: application/json.            */
        body().custom(value => {                                                /* [FROM API.md]: all parameters should be defined (no optional parameters)             */
            if (value.newAisleID === undefined ||
                value.newRow === undefined ||
                value.newCol === undefined ||
                value.newMaxWeight === undefined ||
                value.newMaxVolume === undefined ||
                value.newOccupiedWeight === undefined ||
                value.newOccupiedVolume === undefined) {
                    throw new Error('Missing parameters');
                }
            return true;
        }),
        body('newAisleID').isLength({min: 4, max: 4}).isNumeric(),                 /* [FROM API.md]: aisleID is a 4 digits string                                          */
        body('newRow').isLength({min: 4, max: 4}).isNumeric(),                     /* [FROM API.md]: row is a 4 digits string                                              */
        body('newCol').isLength({min: 4, max: 4}).isNumeric(),                     /* [FROM API.md]: col is a 4 digits string                                              */
        body('newMaxWeight').isInt({gt: 0}),                                       /* [FROM API.md]: maxWeight is an integer value reasonably greater than zero            */
        body('newMaxVolume').isInt({gt: 0}),                                       /* [FROM API.md]: maxVolume is an integer value reasonably greater than zero            */
        body('newOccupiedWeight').isInt({gt: 0}),                                  /* [FROM API.md]: occupiedWeight is an integer value reasonably greater than zero       */
        body('newOccupiedVolume').isInt({gt: 0})                                   /* [FROM API.md]: occupiedVolume is an integer value reasonably greater than zero       */
    ],
    validationHandler,
    positionController.editPosition);

/**
 * API:
 *          PUT /api/position/:positionID/changeID
 * ===============================================================
 */
router.put(
    "/position/:positionID/changeID", 
    [
        param('positionID').isLength({min: 12, max: 12}).isNumeric(),           /* [FROM API.md]: positionID is a 12 digits string                                      */
        header('Content-Type').equals('application/json'),                      /* [FROM API.md]: Request header has a line: Content-Type: application/json.            */
        body().custom(value => {                                                /* [FROM API.md]: all parameters should be defined (no optional parameters)             */
            if (value.newPositionID === undefined) {
                    throw new Error('Missing parameter');
                }
            return true;
        }),
        body('newPositionID').isLength({min: 12, max: 12}).isNumeric()          /* [FROM API.md]: aisleID is a 4 digits string                                          */
    ],
    validationHandler,
    positionController.editPositionID);

/**
 * API:
 *                DELETE /api/position/:positionID
 * ===============================================================
 */
router.delete(
    "/position/:positionID",
    [
        param('positionID').isLength({min: 12, max: 12}).isNumeric(),           /* [FROM API.md]: positionID is a 12 digits string                                      */
        body().custom(value => {                                                /* [FROM API.md]: body should be empty                                                  */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler, 
    positionController.deletePosition);


module.exports = router;