const service = require('../../services/sale');
const statusCodes = require('../../commons/statusCodes.json');

module.exports = async (req, res, next) => {
  const sale = req.body;

  if (!sale) {
    return next({
      err: { code: 'invalid_data' },
    });
  }

  const created = await service.create(sale);

  if (created.err) {
    return next({
      err: { code: created.err.code, message: created.err.message },
    });
  }

  res.status(statusCodes.ok).json(created);
};