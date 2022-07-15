const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogListRouter = require('./controllers/blogList');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  var requestLogger = require('./utils/requestLogger'); 
  app.use(requestLogger);
}

app.use('/api/blogs', blogListRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;