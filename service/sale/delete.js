const { ObjectID } = require('mongodb');
const sale = require('../../model/document')('sales');

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

    await sale.remove(id);
    return saleToDelete;
  } catch (e) {
    console.log(e);
  }
};