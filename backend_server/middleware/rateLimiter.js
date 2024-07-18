const rateLimit = {};
const config = require('../config/config');

const rateLimiter = (req, res, next) => {
    const key = req.body.username;
    if (!rateLimit[key]) {
        rateLimit[key] = { attempts: 0, lastAttempt: Date.now() };
    }

    const now = Date.now();
    if (now - rateLimit[key].lastAttempt > 60000) {
        rateLimit[key].attempts = 0;
    }

    rateLimit[key].lastAttempt = now;

    if (rateLimit[key].attempts >= config.auth.rateLimit) {
        return res.status(429).send('Too many attempts.');
    }

    rateLimit[key].attempts++;
    next();
};

module.exports = rateLimiter;