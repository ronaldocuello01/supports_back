import express from 'express'

const router = express.Router();
const controller = require('../controllers/servicetype.controller');


// get
router.get('/', controller.getAll);


module.exports = router;