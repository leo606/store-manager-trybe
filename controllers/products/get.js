const statusCodes = require('../../commons/statusCodes.json');
const service = require('../../services/product');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const findProduct = await service.get(id);

  if (findProduct.err) {
    return next({
      err: {
        code: findProduct.err.code,
        message: findProduct.err.message,
      },
    });
  }

  res.status(statusCodes.ok).json(findProduct);
};