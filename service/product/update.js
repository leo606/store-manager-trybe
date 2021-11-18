const { ObjectID } = require('mongodb');
const product = require('../../model/document')('products');
const { productSchema } = require('../joiSchemas');

module.exports = async (id, { name, quantity }) => {
  if (!ObjectID.isValid(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }

  const valid = productSchema.validate({ name, quantity });
  if (valid.error) {
    return { err: { message: valid.error.message, code: 'invalid_data' } };
  }

  await product.update({ id, name, quantity });

  return { _id: id, name, quantity };
};