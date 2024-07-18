const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const rateLimitMiddleware = require('../middleware/rateLimiter');
const checkLock = require("../middleware/checkLock");

router.post('/register', authController.registerUser);
router.post('/login', checkLock, rateLimitMiddleware, authController.login);
router.post('/generate-link', checkLock, rateLimitMiddleware, authController.generateLink);
router.get('/link/:token', authController.linkLogin);
router.get('/time', checkLock, rateLimitMiddleware, authController.getTime);
router.post('/kickout', authController.kickout);

module.exports = router;