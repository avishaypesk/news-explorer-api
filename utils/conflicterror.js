const errorCodes = require('./errorcodes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = errorCodes.REQUEST_CONFLICT;
  }
}

module.exports = ConflictError;