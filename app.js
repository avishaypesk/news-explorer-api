require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorLogger, requestLogger } = require('./middleware/logger');
const centralerrhandler = require('./middleware/centralerrhandler');
const NotFoundError = require('./utils/notfounderror');
const mainRoute = require('./routes');
const MONGODB_DEV_URL = 'mongodb://0.0.0.0:27017/news-explorer';

const { PORT = 3000, NODE_ENV, MONGODB_URL = MONGODB_DEV_URL } = process.env;
const app = express();

mongoose.connect(MONGODB_URL);

app.use((req, res, next) => {
  // Set headers to allow cross-origin requests
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Check if the request is an options request
  if (req.method === 'OPTIONS') {
    // Respond with a 200 status code
    res.sendStatus(200);
  } else {
    // Continue to the next middleware
    next();
  }
});

app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.use('/', mainRoute);

app.use('/', (req, res, next) => {
  next(new NotFoundError('Requested resource not found.'));
});

app.use(errorLogger);

app.use(errors());
app.use(centralerrhandler);

if (NODE_ENV !== 'test') app.listen(PORT);