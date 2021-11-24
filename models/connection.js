const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb://${
  process.env.HOST || 'mongodb'
}:27017/StoreManager`;
const DB_NAME = 'StoreManager';
const MONGO_OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

function connection() {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, MONGO_OPTS).then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    });
}

module.exports = { connection };
