const { expect } = require("chai");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

const Model = require("../../model/document");
const mongoConnection = require("../../model/connection");

describe("inserir filme no DB", () => {
  const payloadProduct = {
    title: "product one",
    quantity: 3,
  };
  const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  let connectionMock;

  before(async () => {
    const memoryServer = await MongoMemoryServer.create();
    const mockURI = memoryServer.getUri();

    connectionMock = MongoClient.connect(mockURI, DB_OPTIONS).then(
      (conn) => conn.db("StoreManager")
    );

    sinon.stub(mongoConnection,'connection').resolves(connectionMock);
  });

  describe("inserido com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await MovieModel.create(payloadMovie);
      expect(response).to.be.a("object");
    });
  });
});
