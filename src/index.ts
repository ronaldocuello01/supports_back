import express from 'express'

// const router = require('express').Router();
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');


// init
const app = express()


// settings
app.set('port', process.env.PORT || 4000);


// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));



// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/services', require('./routes/services.routes'));
app.use('/api/servicetypes', require('./routes/servicetypes.routes'));



app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});