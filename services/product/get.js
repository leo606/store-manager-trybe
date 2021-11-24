const { ObjectID } = require('mongodb');
const product = require('../../models/document')('products');

module.exports = async (id) => {
  if (!ObjectID.isValid(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }

  const find = await product.find(new ObjectID(id));
  if (!find) {
    return { err: { message: 'Product not found', code: 'not_found' } };
  }
  return find;
};