require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const { notFound, internalError } = require('./middlewares/errors.js');

// Create an Express app
const app = express();

// Middlewares
app.use(helmet());
app.use(express.json({ limit: '6kb' }));
app.use(logger);
app.use(limiter);
app.use(timeout());


const MainRouter = require('./routes/Index.js');
app.use(MainRouter);


// Errors
app.use(notFound);
app.use(internalError);

const port = process.env.PORT;
app.listen(port, () => process.send ? process.send('ready') : console.log(`Waiting for events at http://127.0.0.1:${port}/discord/webhook (${process.env.NODE_ENV})`));