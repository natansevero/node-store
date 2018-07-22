const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer');
const authService = require('../services/auth')

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate)
router.get('/refresh-token', authService.authorize, controller.refreshToken)

module.exports = router; 