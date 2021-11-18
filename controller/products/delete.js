const service = require('../../service/product');
const statusCodes = require('../statusCodes.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const deleted = await service.remove(id);
  if (deleted.err) {
    return next({
      err: { code: deleted.err.code, message: deleted.err.message },
      status: statusCodes.unprocessableEntity,
    });
  }

  res.status(statusCodes.ok).json(deleted);
};