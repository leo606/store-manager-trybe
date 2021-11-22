const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DBSERVER = new MongoMemoryServer();

async function getConn() {
  const mockURI = await DBSERVER.getUri();

  return (await MongoClient.connect(mockURI, DB_OPTIONS)).db("StoreManager");
}

module.exports = getConn;
