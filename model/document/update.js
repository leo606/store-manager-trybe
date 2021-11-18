const { ObjectID } = require('mongodb');
const connection = require('../connection');

module.exports = async (collection, entity) => {
  const { id, ...dataToSet } = entity;

  const updated = await (await connection())
    .collection(collection)
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { ...dataToSet } },
      { returnDocument: 'after' }, // source: https://stackoverflow.com/questions/24747189/update-and-return-document-in-mongodb
  );

  return updated;
};