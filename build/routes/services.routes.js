"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
