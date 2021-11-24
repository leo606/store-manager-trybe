const { ObjectID } = require('mongodb');
const { bulkArrayGenerate } = require('../../commons/queryList');
const sale = require('../../models/document')('sales');
const product = require('../../models/document')('products');

const ERR_OBJ = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

module.exports = async (id) => {
  try {
    if (!ObjectID.isValid(id)) {
      return ERR_OBJ;
    }

    const saleToDelete = await sale.find(new ObjectID(id));
    if (!saleToDelete) {
      return ERR_OBJ;
    }
    await product.bulk(bulkArrayGenerate(saleToDelete.itensSold, 'sum'));

    await sale.remove(id);
    return saleToDelete;
  } catch (e) {
    console.log(e);
  }
};