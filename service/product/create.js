const joi = require('@hapi/joi');
const product = require('../../model/document')('products');

const productSchema = joi.object().keys({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required(),
});

module.exports = async ({ name, quantity }) => {
  const valid = productSchema.validate({ name, quantity });
  if (valid.error) {
    return { err: { message: valid.error.message, code: 'invalid_data' } };
  }

  const find = await product.find({ name });
  if (find) {
    return { err: { message: 'Product already exists', code: 'invalid_data' } };
  }

  const insert = await product.create({ name, quantity });
  return insert.ops[0];
};