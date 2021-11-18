const sale = require('../../model/document')('sales');
const { saleSchema } = require('../joiSchemas');

const ERR_OBJ = { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };

module.exports = async (products) => {
  const valid = saleSchema.validate(products);
  if (valid.error) {
    return ERR_OBJ;
  }
  const insert = await sale.create({ itensSold: products });
  return insert.ops[0];
};