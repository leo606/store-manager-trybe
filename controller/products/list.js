const service = require('../../service/product');
const statusCodes = require('../statusCodes.json');

module.exports = async (_req, res, _next) => {
  const products = await service.list();

  res.status(statusCodes.ok).json(products);
};