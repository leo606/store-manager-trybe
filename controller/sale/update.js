const service = require('../../services/sale');
const statusCodes = require('../../commons/statusCodes.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const sale = req.body;

  if (!id || !sale) {
    return next({
      err: { code: 'invalid_data' },
    });
  }

  const updated = await service.update(id, sale);
  if (updated.err) {
    return next({
      err: { code: updated.err.code, message: updated.err.message },
    });
  }
  res.status(statusCodes.ok).json(updated);
};
