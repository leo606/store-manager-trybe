const { ObjectID } = require('mongodb');
const sale = require('../../models/document')('sales');
const { saleSchema } = require('../../commons/joiSchemas');

const ERR_OBJ = { err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } };

module.exports = async (id, itensSold) => {
  const valid = saleSchema.validate(itensSold);
  if (valid.error || !ObjectID.isValid(id)) {
    return ERR_OBJ;
  }

  const update = await sale.update({ id, itensSold });
  
  return update.value;
};