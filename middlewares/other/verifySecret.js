module.exports = (req, res, next) => {
	const { access_token: headerSecret } = req.headers;
	const { shardSecret: bodySecret } = req.body;
	if (headerSecret !== process.env.SHARD_SECRET || bodySecret !== process.env.SHARD_SECRET) {
		console.warn(`An incorrect shardSecret (req.headers.access_token || req.body.shardSecret) was received! Client IP: ${req.ip}`);
		return res.sendStatus(403);
	}

	next();
};