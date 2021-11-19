const connection = require('../connection');

// source: https://stackoverflow.com/questions/37023520/update-many-documents-in-mongodb-with-different-values
module.exports = async (collection, list) => {
  try {
    const operation = await (await connection()).collection(collection).bulkWrite(list);
    return operation;
  } catch (e) {
    console.log(e);
  }
};