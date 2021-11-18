const { saleSchema } = require('../joiSchemas');

const ERR_OBJ = { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };

module.exports = async (sale) => {
  const valid = saleSchema.validate(sale);
  if (valid.error) {
    return ERR_OBJ;
  }
  return {};
};