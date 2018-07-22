const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer');

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate)

module.exports = router; 