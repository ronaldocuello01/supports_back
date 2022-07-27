import express from 'express'

const router = express.Router();
const controller = require('../controllers/user.controller');
// const { verify } = require('../middlewares/auth');


// post
router.post('/login', controller.login);
router.post('/signup', controller.create);


module.exports = router;