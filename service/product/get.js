const { ObjectID } = require('mongodb');
const product = require('../../model/document')('products');

module.exports = async (id) => {
  if (!ObjectID.isValid(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }

  const find = await product.find(new ObjectID(id));
  return find;
};