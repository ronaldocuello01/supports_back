"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn = require('../database/connection');
const jwt = require('jsonwebtoken');
class userController {
    constructor() {
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, email, password } = req.body;
            if (nombre && email && password) {
                try {
                    yield conn.query(`insert into users (nombre, email, passwrd, stat) values ('${nombre}', '${email}', '${password}', 'A')`);
                    const user = Object.assign(Object.assign({}, req.body), { status: 'A' });
                    res.json(user);
                }
                catch (error) {
                    res.json({
                        status: 400,
                        msg: error
                    });
                }
            }
            else {
                res.json({
                    status: 500,
                    msg: 'datos incompletos'
                });
            }
        });
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
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const users = yield conn.query(`select * from users where email = '${email}' and passwrd = '${password}'`);
            const user = users.rows[0];
            if (user) {
                jwt.sign({ id: user.id, nombre: user.nombre, email: user.email }, 'secret', (err, token) => {
                    res.json({ token });
                });
            }
            else {
                res.json({
                    status: 500,
                    msg: 'el usuario no existe'
                });
            }
        });
    }
}
const c = new userController();
module.exports = c;
