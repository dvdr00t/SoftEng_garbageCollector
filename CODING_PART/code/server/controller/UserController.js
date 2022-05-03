"use strict";

class UserController {
    constructor(dao) {
        this.dao = dao
    }

    newUser = async (req, res) => {
        const sql = "INSERT INTO USERS(USERNAME, NAME, SURNAME, PASSWORD, TYPE) VALUES (?,?,?,?,?)";
        //return this.dao.run(sql)
    
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({error: "Empty Body request"});
          }
        let data = req.body;
        await this.dao.run(sql, [data.username, data.name, data.surname, data.password, data.type])
        //await usr_db.storeUser(req.body);
        return res.status(201).json({message: "ok"})
    }

    getStoredUsers = async (req, res) =>{
            const sql = "SELECT * FROM USERS";
            let result = await this.dao.all(sql);
            return res.status(200).json(result);
    }
}

module.exports = UserController;