const { ObjectID } = require('mongodb');

function getIdsListIn(products) {
  return { _id: { $in: products.map((p) => new ObjectID(p.productId)) } };
}

const projectListOfProducts = {
  _id: 0,
  quantity: 1,
  id: { $toString: '$_id' },
};

function bulkArrayGenerate(productsList, op) {
  return productsList.map((pro) => ({
    updateOne: {
      filter: { _id: new ObjectID(pro.productId) },
      update: { $inc: { quantity: op === 'sub' ? -pro.quantity : pro.quantity } },
    },
  }));
}

module.exports = { getIdsListIn, projectListOfProducts, bulkArrayGenerate };
