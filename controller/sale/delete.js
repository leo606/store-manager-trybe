const service = require('../../service/sale');
const statusCodes = require('../statusCodes.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await service.remove(id);

    if (deleted.err) {
      return next({
        err: { code: deleted.err.code, message: deleted.err.message },
      });
    }
    res.status(statusCodes.ok).json(deleted);
  } catch (e) {
    console.log(e);
  }
};
