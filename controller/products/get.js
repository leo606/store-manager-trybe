const statusCodes = require('../statusCodes.json');
const service = require('../../service/product');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const findProduct = await service.get(id);

  if (findProduct.err) {
    return next({
      err: {
        code: findProduct.err.code,
        message: findProduct.err.message,
      },
      status: findProduct.err.code === 'invalid_data'
      ? statusCodes.unprocessableEntity
      : statusCodes.notFound,
    });
  }

  res.status(statusCodes.ok).json(findProduct);
};