const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
	windowMs: 2 * 60 * 1000,
	limit: 20,
	standardHeaders: 'draft-7',
	legacyHeaders: false,

	skip: req => req.ip === '::ffff:127.0.0.1' && process.env.NODE_ENV === 'development',
	handler: (req, res) => res.status(429).json({ success: false, status: 429, message: 'Too Many Requests' }),
});