const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const authService = require('../services/auth');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
// Route with auth
router.post('/', authService.authorize, controller.post);
router.put('/:id',  authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router; 