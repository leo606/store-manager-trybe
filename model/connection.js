const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/StoreManager`;
const DB_NAME = 'StoreManager';
const MONGO_OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connection = null;

module.exports = async () => {
  try {
    // return connection || (connection = await MongoClient.connect(MONGO_DB_URL, MONGO_OPTS).db(DB_NAME));
    if (connection) return connection;
    connection = await MongoClient.connect(MONGO_DB_URL, MONGO_OPTS).db(DB_NAME);
    return connection;
  } catch (e) {
    console.log(e);
  }
};