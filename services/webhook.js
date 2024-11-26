const axios = require('./axios.js');

module.exports = async (res, embed) => {
	try {
		await axios.post(process.env.DISCORD_WEBHOOK_URL, { embeds: [embed] });

		return true;
	} catch (err) {
		res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
		console.error(err.stack);

		return false;
	}
};