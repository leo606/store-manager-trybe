const joi = require('@hapi/joi');
const product = require('../../model/document')('products');

const productSchema = joi.object().keys({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(0).required(),
});

module.exports = async ({ name, quantity }) => {
  const valid = productSchema.validate({ name, quantity });
  if (valid.error) {
    return { err: { message: valid.error.message, code: 'invalid_data' } };
  }

  const insert = await product.create({ name, quantity });
  return insert.ops[0];
};