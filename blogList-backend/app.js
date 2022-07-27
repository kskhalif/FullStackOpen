const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogListRouter = require('./controllers/blogList');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
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

app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogListRouter
);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
