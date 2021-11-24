const { expect } = require("chai");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

const Model = require("../../model/document")("products");
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
    const MOCK_DB = await MongoMemoryServer.create();
    const MOCK_URI = MOCK_DB.getUri();

    connectionMock = await MongoClient.connect(MOCK_URI, DB_OPTIONS);

    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db("StoreManager").collection("products").drop();
    MongoClient.connect.restore();
  });

  describe("inserido com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await Model.create({
        title: "cool product",
        quantity: 9,
      });
      expect(response).to.be.a("object");
    });
  });

  describe("inserido com asdasd", () => {
    it("retorna um objeto correto", async () => {
      const response = await Model.create({
        title: "cool product",
        quantity: 9,
      });
      expect(response).to.have.a.property("ops").that.is.a("array");
      expect(response).to.have.a.property("insertedCount").that.is.a("number");
      expect(response.ops[0]).to.have.a.property("_id");
      expect(response.ops[0]).to.have.a.property("title", "cool product");
      expect(response.ops[0]).to.have.a.property("quantity", 9);
    });
  });
});
