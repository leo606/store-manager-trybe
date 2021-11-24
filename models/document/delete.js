const { ObjectID } = require('mongodb');
const { connection } = require('../connection');

module.exports = async (collection, id) => {
  try {
    const deleted = await (await connection())
      .collection(collection).deleteOne({ _id: new ObjectID(id) });

    return deleted;
  } catch (e) {
    console.log(e);
  }
};