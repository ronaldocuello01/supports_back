import express from 'express'

const router = express.Router();
const controller = require('../controllers/service.controller');
const { verify } = require('../middlewares/auth');


// get
router.get('/active', verify, controller.getTechnicianServices);
router.get('/finished', verify, controller.getFinished);

// post
router.post('/create', controller.create);
router.post('/start', verify, controller.startService);
router.post('/finish', verify, controller.finishService);


module.exports = router;