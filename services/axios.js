const axios = require('axios');
const { version, homepage } = require('../package.json');

axios.defaults.headers.common = {
	'User-Agent': `Mozilla/5.0 (compatible; Omada-Webhook-to-Discord/${version}; +${homepage})`,
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
	'DNT': '1',
};

axios.defaults.timeout = 30000;

module.exports = axios;