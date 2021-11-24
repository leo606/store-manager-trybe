const { connection } = require('../connection');

module.exports = async (collection, entity) => {
  try {
    const db = await connection();
    const inserted = db.collection(collection).insertOne(entity);
    return inserted;
  } catch (e) {
    console.log(e);
  }
};