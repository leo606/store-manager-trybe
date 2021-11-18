const connection = require('../connection');

module.exports = async (collection) => {
  try {
    const find = await (await connection()).collection(collection).find().toArray();
    return find;
  } catch (e) {
    console.log(e);
  }
};