const product = require('../../model/document')('products');

module.exports = async () => {
  const products = await product.list();
  return { products };
};