const morgan = require('morgan');

morgan.token('body', (request, response) => 
    JSON.stringify(request.body)
);

const requestLogger = morgan(':method :url :status :body');

module.exports = requestLogger;
