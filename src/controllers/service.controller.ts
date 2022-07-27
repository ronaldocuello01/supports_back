import express from 'express'
const conn = require('../database/connection');
const jwt_decode = require('jwt-decode');

class serviceController{

    constructor (){

    }

    async create(req, res){
        const { address, indications, id_type } = req.body;


        // get users from database
        const { rows } = await conn.query(`select * from users where stat = 'A'`);
        const users = rows;
        console.log('u', users);
        

        // randomly select an user to asign to the service
        let key = Math.floor(Math.random() * (users.length));
        const id_user = users[key].id

        console.log("user", users[key]);
        

        console.log('math', id_user, ' - ', users.length);
        

        // get the datetime to save the service
        const date = new Date()
        let day = (date.getDate()) >= 10? (date.getDate()): '0' + (date.getDate())
        let month = (date.getMonth() + 1) >= 10? (date.getMonth() + 1): '0' + (date.getMonth() + 1)
        let year = (date.getFullYear()) >= 10? (date.getFullYear()): '0' + (date.getFullYear())

        let hour = (date.getHours()) >= 10? (date.getHours()) : "0"+(date.getHours());
        let minutes = (date.getMinutes()) >= 10? (date.getMinutes()) : "0"+(date.getMinutes());
        let seconds = (date.getSeconds()) >= 10? (date.getSeconds()) : "0"+(date.getSeconds());

        const datetime = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`


        if ( indications && address ){
            const service = {...req.body, id_technician: id_user, save_date: datetime, status: 'A'}

            // save in database
            await conn.query(`insert into services (indications, addr, date_save, id_technician, id_type, stat) values ('${indications}', '${address}', '${datetime}', '${id_user}', '${id_type}', 'A')`);

            res.json(service);

        }else{
            res.json({
                status: 500,
                msg: 'datos incompletos'
            });
        }
    }


    async startService(req, res){
        const { id } = req.body;

        // get the datetime to save the service
        const date = new Date()
        let day = (date.getDate()) >= 10? (date.getDate()): '0' + (date.getDate())
        let month = (date.getMonth() + 1) >= 10? (date.getMonth() + 1): '0' + (date.getMonth() + 1)
        let year = (date.getFullYear()) >= 10? (date.getFullYear()): '0' + (date.getFullYear())

        let hour = (date.getHours()) >= 10? (date.getHours()) : "0"+(date.getHours());
        let minutes = (date.getMinutes()) >= 10? (date.getMinutes()) : "0"+(date.getMinutes());
        let seconds = (date.getSeconds()) >= 10? (date.getSeconds()) : "0"+(date.getSeconds());

        const datetime = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`

        if (id){
            
            // modify the bd record with the P status and the start_date (datetime)
            await conn.query(`update services set stat = 'P', date_start = '${datetime}' where id = '${id}'`);

            res.json({ status: 200, msg: 'Servicio iniciado' });

        }else{
            res.json({
                status: 500,
                msg: 'datos incompletos'
            });
        }
    }


    async finishService(req, res){
        const { id } = req.body;

        // get the datetime to save the service
        const date = new Date()
        let day = (date.getDate()) >= 10? (date.getDate()): '0' + (date.getDate())
        let month = (date.getMonth() + 1) >= 10? (date.getMonth() + 1): '0' + (date.getMonth() + 1)
        let year = (date.getFullYear()) >= 10? (date.getFullYear()): '0' + (date.getFullYear())

        let hour = (date.getHours()) >= 10? (date.getHours()) : "0"+(date.getHours());
        let minutes = (date.getMinutes()) >= 10? (date.getMinutes()) : "0"+(date.getMinutes());
        let seconds = (date.getSeconds()) >= 10? (date.getSeconds()) : "0"+(date.getSeconds());

        const datetime = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`

        if (id){
            
            // modify the bd record with the F status and the finish_date (datetime)
            await conn.query(`update services set stat = 'F', date_finish = '${datetime}' where id = '${id}'`);

            res.json({ status: 200, msg: 'Servicio finalizado' });

        }else{
            res.json({
                status: 500,
                msg: 'datos incompletos'
            });
        }
    }


    async getTechnicianServices(req, res){

        const {id} = jwt_decode(req.token);

        if (id){
            let sql = `select * from services where (stat = 'A' or stat = 'P') and id_technician = ${id}`;
            console.log(sql);
            const {rows} = await conn.query(sql);
            let services = rows
            res.json({ services });

        }else{
            res.json({
                status: 403,
                msg: 'forbidden'
            });
        }
    }


    async getFinished(req, res){

        const {id} = jwt_decode(req.token);
        console.log(id);
        

        if (id){
            let sql = `select * from services where stat = 'F' and id_technician = ${id}`;
            console.log(sql);
            
            const {rows} = await conn.query(sql);
            let services = rows
            res.json({ services });

        }else{
            res.json({
                status: 403,
                msg: 'forbidden'
            });
        }
    }    


}


const c = new serviceController();

module.exports = c;