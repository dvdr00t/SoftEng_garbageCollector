/**
 *                  DAO: PositionDAO
 * =====================================================================
 * Data Access Objects (DAOs) are used by controllers in order to access
 * the database in a more structural and modular fashion. 
 * ---------------------------------------------------------------------
 * In particular, PositionDAO is the DAO of the class positionController.
 * It has a constructor, which creates the PositionDAO object starting 
 * from a general purpose DAO, which implements the functions:
 *      - run() to execute a query without results returned
 *      - get() to execute a query with a single result returned
 *      - all() to execute a query with an array of results returned.
 */

'use strict'

class PositionDAO {

    /**
     * CONSTRUCTOR: PositionDAO
     * ---------------------------------
     * @param {Object} generalPurposeDAO 
     */
    constructor (generalPurposeDAO) {
        this.dao = generalPurposeDAO;
    }


    /*
        + -------------------- +
        |        METHODS       |
        + -------------------- +
    */

    /**
     * Retrieves all the Position object in the DB
     * ----------------------------------------------------------------------
     * @returns an Array object containing all Position objects in the DB.
     */
    getPositions = async () => {
        const querySQL = "SELECT * FROM POSITIONS";
        return this.dao.all(
            querySQL
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Retrieves the Position object in the DB corresponding to the positionID
     * ----------------------------------------------------------------------
     * @param {String} positionID 
     * @returns a Position Object.
     */
    getPositionByID = async (positionID) => {
    
        const querySQL = "SELECT * FROM POSITIONS WHERE POSITIONS.positionID == ?";
        return this.dao.get(
            querySQL,
            [
                positionID
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Insert a new Position Object in the DB
     * -------------------------------------------
     * @param {JSON} positionObject 
     * @returns No object
     */
    newPosition = async (positionObject) => {
        const querySQL = "INSERT INTO POSITIONS VALUES (?, ?, ?, ?, ?, ?, 0, 0)";
        return this.dao.run(
            querySQL,
            [
                positionObject.positionID,
                positionObject.aisleID,
                positionObject.row,
                positionObject.col,
                positionObject.maxWeight,
                positionObject.maxVolume
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Update a Position object given its positionID
     * ---------------------------------------------
     * @param {String} positionID 
     * @param {JSON} positionObject 
     */
    updatePositionByPositionID = async (positionID, positionObject) => {
        const querySQL = "UPDATE POSITIONS SET positionID = ?, aisleID = ?, row = ?, col = ?, maxWeight = ?, maxVolume = ?, occupiedWeight = ?, occupiedVolume = ? WHERE positionID == ?";
        return this.dao.run(
            querySQL,
            [
                positionObject.newPositionID,
                positionObject.newAisleID,
                positionObject.newRow,
                positionObject.newCol,
                positionObject.newMaxWeight,
                positionObject.newMaxVolume,
                positionObject.newOccupiedWeight,
                positionObject.newOccupiedVolume,
                positionID
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }


    /**
     * Update positionID of Position Object given its positionID
     * ----------------------------------------------------------
     * @param {String} positionID 
     * @param {String} newPositionID 
     */
    updatePositionID = async (positionID, newPositionID) => {
        const querySQL = "UPDATE POSITIONS SET positionID = ?, aisleID = ?, row = ?, col = ? WHERE positionID == ?";
        return this.dao.run(
            querySQL,
            [
                newPositionID,
                newPositionID.slice(0, 4),
                newPositionID.slice(4, 8),
                newPositionID.slice(8, 12),
                positionID
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Update occupiedWeight and occupiedVolume of position object
     * -----------------------------------------------------------
     * @param {String} positionID 
     * @param {Number} newOccupiedWeight 
     * @param {Number} newOccupiedVolume 
     */
    updatePositionQuantity = async (positionID, newOccupiedWeight, newOccupiedVolume) => {
        const querySQL = "UPDATE POSITIONS SET occupiedWeight = ?, occupiedVolume = ? WHERE positionID == ?";
        return this.dao.run(
            querySQL,
            [
                newOccupiedWeight,
                newOccupiedVolume,
                positionID
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }


    /**
     * Remove a Position Object from DB given it positionID
     * ----------------------------------------------------
     * @param {String} positionID 
     */
    removePosition = async (positionID) => {
        const querySQL = "DELETE FROM POSITIONS WHERE POSITIONS.positionID == ?"
        return this.dao.run(
            querySQL,
            [
                positionID
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }
}

module.exports = PositionDAO;