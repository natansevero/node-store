const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer');

router.post('/', controller.post);

module.exports = router; 