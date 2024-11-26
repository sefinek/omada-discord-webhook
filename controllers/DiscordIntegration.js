const createEmbed = require('../services/discord.js');
const webhook = require('../services/webhook.js');

module.exports = async (req, res) => {
	if (!process.env.DISCORD_WEBHOOK_URL) {
		return res.status(500).send('DISCORD_WEBHOOK_URL is not set in the environment variables');
	}
	if (!req.body || typeof req.body !== 'object') {
		return res.status(400).send('Invalid request body format');
	}

	const { description, text, Controller, timestamp, Site } = req.body;
	const formattedTimestamp = new Date(parseInt(timestamp) || Date.now()).toISOString();

	let details = '';
	if (Array.isArray(text) && text.length > 0) {
		try {
			details = JSON.parse(text[0]).operation || text.join('\n');
		} catch {
			details = text.join('\n');
		}
	}

	const embed = createEmbed(Controller || '✨  Integration works correctly!', description, details || null, Site, formattedTimestamp);
	const success = await webhook(res, embed);
	if (success) res.sendStatus(200);
};