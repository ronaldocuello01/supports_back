import express from 'express'
const conn = require('../database/connection');

class serviceTypeController{

    constructor (){

    }

    async getAll(req, res){
        try {
            // get all the services types
            const {rows} = await conn.query('select * from servicetypes');
            let servicetypes = rows

            res.json( servicetypes );
        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }

}

const c = new serviceTypeController();

module.exports = c;