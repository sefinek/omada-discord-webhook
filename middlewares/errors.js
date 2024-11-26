exports.notFound = (req, res) => {
	res.sendStatus(404).end();
};

exports.internalError = (err, req, res, _next) => {
	res.sendStatus(500).end();
	console.error(err);
};