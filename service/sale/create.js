const { ObjectID } = require('mongodb');
const sale = require('../../model/document')('sales');
const product = require('../../model/document')('products');
const { saleSchema } = require('../joiSchemas');

function errorGen(code) {
  return {
    err: {
      message:
        code === 'invalid_data'
          ? 'Wrong product ID or invalid quantity'
          : 'Such amount is not permitted to sell',
      code,
    },
  };
}

function bulkArrayGenerate(productsList) {
  return productsList.map((pro) => ({
    updateOne: {
      filter: { _id: new ObjectID(pro.productId) },
      update: { $inc: { quantity: -pro.quantity } },
    },
  }));
}
const project = {
  _id: 0,
  quantity: 1,
  id: { $toString: '$_id' },
};

// products [ {producdID: xx, quantity: xxx}, {} ]
// match [ {id: xx, quantity: xxx}, {} ]
function haveNegative(products, match) {
  return products.some((p) => {
    const matched = match.find((m) => m.id === p.productId);
    return matched.quantity - p.quantity < 0;
  });
}

module.exports = async (products) => {
  try {
    const valid = saleSchema.validate(products);
    if (valid.error) return errorGen('invalid_data');

    const queryMatch = {
      _id: { $in: products.map((p) => new ObjectID(p.productId)) },
    };
    const productsMatched = await product.list(queryMatch, project);
    if (haveNegative(products, productsMatched)) { return errorGen('stock_problem'); }

    await product.bulk(bulkArrayGenerate(products));

    const insert = await sale.create({ itensSold: products });
    return insert.ops[0];
  } catch (e) {
    console.log(e);
  }
};
