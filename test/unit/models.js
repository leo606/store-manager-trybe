const { expect } = require("chai");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

const Model = require("../../models/document")("products");
const mongoConnection = require("../../models/connection");

const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

describe("teste de models", () => {
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
  const mockProduct = { title: "cool product", quantity: 9 };

  describe("criar documento", () => {
    it("retorna um objeto", async () => {
      const response = await Model.create({ ...mockProduct });
      expect(response).to.be.a("object");
    });

    it("retorna um objeto correto", async () => {
      const response = await Model.create({ ...mockProduct });
      expect(response).to.have.a.property("ops").that.is.a("array");
      expect(response).to.have.a.property("insertedCount").that.is.a("number");
      expect(response.ops[0]).to.have.a.property("_id");
      expect(response.ops[0]).to.have.a.property("title", "cool product");
      expect(response.ops[0]).to.have.a.property("quantity", 9);
    });
  });

  describe("retornar documento", () => {
    const productsList = [
      { title: "cool product", quantity: 9 },
      { title: "foo", quantity: 3 },
      { title: "goo", quantity: 8 },
    ];

    it("retorna um objeto", async () => {
      await connectionMock
        .db("StoreManager")
        .collection("products")
        .insertMany([...productsList]);

      const find = await Model.find({ ...productsList[1] });
      expect(find).to.be.a("object");
    });

    it("retorna um objeto correto", async () => {
      const find = await Model.find({ ...productsList[2] });

      expect(find).to.have.a.property("title").that.is.a("string");
      expect(find).to.have.a.property("quantity").that.is.a("number");
    });
  });

  describe("listar documentos", () => {
    const products = [
      { title: "cool product", quantity: 9 },
      { title: "foo", quantity: 3 },
      { title: "goo", quantity: 8 },
    ];
    it("retorna um array", async () => {
      await connectionMock
        .db("StoreManager")
        .collection("products")
        .insertMany([...products]);

      const list = await Model.list();
      expect(list).to.be.a("array");
    });

    it("retorna um array correto", async () => {
      const find = await Model.list();

      expect(find).be.an("array");
    });
  });

  describe("deletar documento", () => {
    const productsList = [
      { title: "cool product", quantity: 9 },
      { title: "foo", quantity: 3 },
      { title: "goo", quantity: 8 },
    ];

    it("retorna um objeto", async () => {
      await connectionMock
        .db("StoreManager")
        .collection("products")
        .insertMany([...productsList]);

      const doc = await connectionMock
        .db("StoreManager")
        .collection("products")
        .findOne({ ...productsList[0] }, { $toString: "$_id" });

      const response = await Model.remove(doc._id);
      expect(response).to.be.a("object");
    });

    // it("retorna um objeto correto", async () => {});
  });

  describe("atualizar documento", () => {
    const productsList = [
      { title: "cool product", quantity: 9 },
      { title: "foo", quantity: 3 },
      { title: "goo", quantity: 8 },
    ];

    it("retorna um objeto correto", async () => {
      await connectionMock
        .db("StoreManager")
        .collection("products")
        .insertMany([...productsList]);

      const doc = await connectionMock
        .db("StoreManager")
        .collection("products")
        .findOne({ ...productsList[0] }, { $toString: "$_id" });

      const response = await Model.update({ id: doc._id, quantity: 4 });
      expect(response).to.be.a("object");

      expect(response.value)
        .to.be.a("object")
        .that.have.property("title", "cool product");
      expect(response.value)
        .to.be.a("object")
        .that.have.property("quantity", 4);
    });
  });
});
