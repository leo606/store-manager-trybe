const { connection } = require('../connection');

module.exports = async (collection, query = {}, projection = {}) => {
  try {
    const find = await (await connection())
      .collection(collection)
      .find(query)
      .project(projection)
      .toArray();
    return find;
  } catch (e) {
    console.log(e);
  }
};
