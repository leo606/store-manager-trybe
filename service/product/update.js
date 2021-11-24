const { ObjectID } = require('mongodb');
const product = require('../../models/document')('products');
const { productSchema } = require('../../commons/joiSchemas');

module.exports = async (id, { name, quantity }) => {
  if (!ObjectID.isValid(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }

  const valid = productSchema.validate({ name, quantity });
  if (valid.error) {
    return { err: { message: valid.error.message, code: 'invalid_data' } };
  }

  const updated = await product.update({ id, name, quantity });

  return updated.value;
};