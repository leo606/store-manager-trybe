const service = require('../../service/sale');
const statusCodes = require('../statusCodes.json');

module.exports = async (_req, res, _next) => {
  const sales = await service.list();

  res.status(statusCodes.ok).json({ sales });
};