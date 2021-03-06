const service = require('../../services/sale');
const statusCodes = require('../../commons/statusCodes.json');

module.exports = async (_req, res, _next) => {
  const sales = await service.list();

  res.status(statusCodes.ok).json({ sales });
};