const { ObjectID } = require('mongodb');
const connection = require('../connection');

module.exports = async (collection, entity) => {
  const { id, ...dataToSet } = entity;

  const updated = await (await connection()).collection(collection).updateOne(
    { _id: new ObjectID(id) },
    { $set: { ...dataToSet } },
  );

  return updated;
};