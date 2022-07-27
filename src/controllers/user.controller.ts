import express from 'express'
const conn = require('../database/connection');
const jwt = require('jsonwebtoken');

class userController{

    constructor (){

    }

    async create(req, res){
        const { nombre, email, password } = req.body;
        if (nombre && email && password){
            
            try {
                await conn.query(`insert into users (nombre, email, passwrd, stat) values ('${nombre}', '${email}', '${password}', 'A')`);
                const user = { ...req.body, status: 'A' }
                res.json(user);
            } catch (error) {
                res.json({
                    status: 400,
                    msg: error
                });
            }
            
        }else{
            res.json({
                status: 500,
                msg: 'datos incompletos'
            });
        }
    }


    // async destroy(req, res){
    //     const id = parseInt(req.params.id);

    //     // get from database

    //     if (index >= 0){
    //         users[index].status = 'E';

    //         // change user status to E

    //         res.json(users[index]);
    //     }else{
    //         res.json({
    //             status: 500,
    //             msg: 'el usuario no existe'
    //         });
    //     }
    // }


    async login(req, res) {
        const { email, password } = req.body;

        const users = await conn.query(`select * from users where email = '${email}' and passwrd = '${password}'`);
        const user = users.rows[0]

        if (user){

            jwt.sign({id: user.id, nombre: user.nombre, email: user.email }, 'secret', (err, token) => {
                res.json({token});
            });

        }else{
            res.json({
                status: 500,
                msg: 'el usuario no existe'
            });
        }
    }


    // async logout(req, res) {
    //     res.json({text: 'text'});
    // }

}


const c = new userController();

module.exports = c;