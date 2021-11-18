const { ObjectID } = require('mongodb');
const sale = require('../../model/document')('sales');

const ERR_OBJ = { err: { code: 'not_found', message: 'Sale not found' } };

module.exports = async (id) => {
  if (!ObjectID.isValid(id)) {
    return ERR_OBJ;
  }

  const saleGet = await sale.find(new ObjectID(id));

  if (!saleGet) {
    return ERR_OBJ;
  }

  return saleGet;
};