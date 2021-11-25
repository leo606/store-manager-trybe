const sinon = require("sinon");
const { expect } = require("chai");

const product = require("../../models/document")("products");
const service = require("../../services/product");

describe("test products service", () => {
  const mockProduct = { _id: "lje", name: "product name", quantity: 9 };

  before(() => {
    sinon.stub(product, "list").resolves(mockProduct);
  });

  describe("inserir um produto invalido", () => {
    it("name e quantity invalidos", async () => {
      const res = await service.create({ name: "sdf", quantity: "2" });
      expect(res)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });
  it("produto criar produto existente", async () => {
    const res = await service.list();
    expect(res).to.be.an("object");
  });

  describe("inserir um produto ja existente", () => {});
});
