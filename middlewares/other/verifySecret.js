module.exports = (req, res, next) => {
	const { access_token: secretHeader } = req.headers;
	const { shardSecret: secretBody } = req.body;
	if (secretHeader !== process.env.SHARD_SECRET || secretBody !== process.env.SHARD_SECRET) {
		console.warn(`An incorrect shardSecret was received! Client IP: ${req.ip}`);
		return res.sendStatus(403);
	}

	next();
};