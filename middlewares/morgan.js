const morgan = require('morgan');

morgan.token('body', ({ body }) => JSON.stringify(body));

module.exports = morgan(`[:status :method :response-time ms] :url - :user-agent${process.env.NODE_ENV === 'development' ? ' :remote-addr :body' : ''}`);