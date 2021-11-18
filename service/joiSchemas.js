const joi = require('@hapi/joi');
const { ObjectID } = require('mongodb');

const productSchema = joi.object().keys({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required(),
});

const saleSchema = joi.array().min(1).items(
  joi.object().keys({
    productId: joi.string().custom((value, helper) => {
      if (!ObjectID.isValid(value)) {
        return helper.message('Wrong product ID or invalid quantity');
      }
      return value;
    }),
    quantity: joi.number().min(1).required(),
  }),
);

module.exports = {
  productSchema,
  saleSchema,
};