const { expect } = require("chai");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mockProducts = require("./mockProducts.json");
const bulkUpdateList = require("./mockBulkList.json");

const Models = require("../../model/document")("products");
const mongoConn = require("../../model/connection");

describe("Atualizar com bulkwrite", () => {
  const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  let connectionMock;

  beforeEach(async () => {
    const memoryServer = await MongoMemoryServer.create();
    const mockURI = await memoryServer.getUri();
    console.log("oi");
    connectionMock = await MongoClient.connect(mockURI, DB_OPTIONS);

    sinon.stub(mongoConn, "connect").resolves(connectionMock);
  });

  describe("somar qty", () => {
    it("retorna objeto", async () => {
      expect("1").to.be.eq("1");
    });
  });
});
