const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');
const authService = require('../services/auth');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);

module.exports = router; 