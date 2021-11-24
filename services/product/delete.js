const { ObjectID } = require('mongodb');
const product = require('../../models/document')('products');

const ERR_OBJ = { err: { message: 'Wrong id format', code: 'invalid_data' } };

module.exports = async (id) => {
  if (!ObjectID.isValid(id)) {
    return ERR_OBJ;
  }

  const productToDelete = await product.find(new ObjectID(id));
  if (!productToDelete) {
    return ERR_OBJ;
  }

  await product.remove(id);
  return { ...productToDelete };
};