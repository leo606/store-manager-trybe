const statusCodes = require('../statusCodes.json');

module.exports = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    if (!name || !quantity || !Number(quantity)) {
      return next({
        err: { message: 'Dados inválidos', code: 'invalid_data' },
        status: statusCodes.notAcceptable,
      });
    }
  } catch (e) {
    console.log(e);
  }
};