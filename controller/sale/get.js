const service = require('../../service/sale');
const statusCodes = require('../statusCodes.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next({ err: { code: 'not_found' }, status: statusCodes.notFound });
  }

  const sale = await service.get(id);

  if (sale.err) {
    return next({
      err: { code: sale.err.code, message: sale.err.message },
    });
  }

  res.status(statusCodes.ok).json(sale);
};
