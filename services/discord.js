const REGEX_EMAIL = /\b[\w.%+-]+@[\w.-]+\.[A-Z]{2,}\b/gi;
const REGEX_MAC = /\b([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\b/g;
const REGEX_IP = /\b(\d{1,3}\.){3}\d{1,3}\b/g;

const TYPES = [
	{ regex: /attack|flood/i, emoji: '💥', color: 15482412 }, // Orange red
	{ regex: /dhcp/i, emoji: '🖥️', color: 1830818 }, // Medium spring green
	{ regex: /logs/i, emoji: '📃', color: 15986424 }, // White smoke
	{ regex: /logged (?:out|in)/i, emoji: '👤', color: 1693439 }, // Deep sky blue
	{ regex: /success|test/i, emoji: '✅', color: 5821837 }, // Medium aquamarine
];

const DEFAULT_COLOR = 1658879; // Dodger blue

module.exports = (title, description, details, site, timestamp) => {
	const matchedRule = TYPES.find(({ regex }) => regex.test(details));
	let updatedDetails = details?.replace(/\[(.*?)\]/g, '`[$1]`') || '';

	if (process.env.ENABLE_DATA_CENSORING === 'true') {
		updatedDetails = updatedDetails
			.replace(REGEX_EMAIL, '[EMAIL HIDDEN]')
			.replace(REGEX_MAC, '[HIDDEN]')
			.replace(REGEX_IP, '[HIDDEN]');
	} else {
		updatedDetails = updatedDetails
			.replace(REGEX_EMAIL, '`$&`')
			.replace(REGEX_IP, '**$&**');
	}

	return {
		title: `${matchedRule?.emoji ? `${matchedRule.emoji}  ` : ''}${title || 'Unknown Controller'}`,
		description: updatedDetails,
		color: matchedRule?.color || DEFAULT_COLOR,
		timestamp,
		footer: {
			text: `${description || 'No description provided'} • ${site || 'Unknown Site'}`,
		},
	};
};