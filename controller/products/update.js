const service = require('../../service/product');
const statusCodes = require('../../commons/statusCodes.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updated = await service.update(id, { name, quantity });

  if (updated.err) {
    return next({
      err: {
        code: updated.err.code,
        message: updated.err.message,
      },
    });
  }

  res.status(statusCodes.ok).json(updated);
};
