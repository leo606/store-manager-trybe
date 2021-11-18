const joi = require('@hapi/joi');

module.exports = {
  productSchema: joi.object().keys({
    name: joi.string().min(5).required(),
    quantity: joi.number().min(1).required(),
  }),
};