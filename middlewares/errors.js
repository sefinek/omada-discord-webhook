exports.notFound = (req, res) => {
	res.status(404).end();
};

exports.internalError = (err, req, res, _next) => {
	res.status(500).end();
	console.error(err);
};