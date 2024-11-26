exports.notFound = (req, res) => {
	res.status(404).json({ success: false, status: 404, message: 'Not Found' });
};

exports.internalError = (err, req, res, _next) => {
	res.status(500).json({ success: false, status: 500, message: 'Internal Server Error' });
	console.error(err);
};