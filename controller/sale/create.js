const service = require('../../service/sale');
const statusCodes = require('../statusCodes.json');

module.exports = async (req, res, next) => {
  const sale = req.body;

  if (!sale) {
    return next({
      err: { code: 'invalid_data' },
      status: statusCodes.unprocessableEntity,
    });
  }

  const created = await service.create(sale);

  if (created.err) {
    return next({
      err: { code: created.err.code, message: created.err.message },
      status: statusCodes.unprocessableEntity,
    });
  }

  res.status(statusCodes.ok).json(created);
};