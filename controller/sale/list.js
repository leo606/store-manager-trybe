const statusCodes = require('../statusCodes.json');

module.exports = async (_req, res, _next) => {
  res.status(statusCodes.notImplemented).end();
};