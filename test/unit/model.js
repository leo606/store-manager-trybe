const { expect } = require("chai");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mockProducts = require("./mockProducts.json");
const bulkUpdateList = require("./mockBulkList.json");

const Models = require("../../model/document")("products");

describe("Atualizar com bulkwrite", () => {
  const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  let connectionMock;

  before(async () => {
    const memoryServer = new MongoMemoryServer();
    const mockURI = await memoryServer.getUri();
    connectionMock = await MongoClient.connect(mockURI, DB_OPTIONS);

    sinon.stub(Models, "bulk").resolves(connectionMock);
  });

  describe("somar qty", () => {
    it("retorna objeto", async () => {
      await connectionMock.collection("products").insertMany(mockProducts);
      const bulkResp = await Models.bulk(bulkUpdateList);
      expect(bulkResp).to.be.an("object");
    });
  });
});
