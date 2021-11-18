const connection = require('../connection');

module.exports = async (collection, entity) => {
  try {
    const inserted = await connection().collection(collection).insertOne(entity);
    return inserted.insertedId;
  } catch (e) {
    console.log(e);
  }
};