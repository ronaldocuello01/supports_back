"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const router = require('express').Router();
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');
// init
const app = (0, express_1.default)();
// settings
app.set('port', process.env.PORT || 4000);
// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express_1.default.json());
app.use(urlencoded({ extended: false }));
// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/services', require('./routes/services.routes'));
app.use('/api/servicetypes', require('./routes/servicetypes.routes'));
app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});
