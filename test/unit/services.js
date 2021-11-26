const sinon = require("sinon");
const { expect } = require("chai");

describe("service de produtos", () => {
  const product = require("../../models/document")("products");
  const service = require("../../services/product");
  describe("listar", () => {
    before(() => {
      sinon.stub(product, "list").resolves([1, 2, 3]);
    });

    it("listar", async () => {
      const ls = await service.list();
      console.log(ls.products);
      expect(ls).to.be.an("object").that.have.property("products");
    });
  });

  describe("criar recebendo invalido", () => {
    before(() => {
      sinon.stub(product, "create").resolves({});
    });
    after(() => {
      product.create.restore();
    });

    it("recebendo dados invalidos", async () => {
      const res = await service.create({ name: "sdf", quantity: "2" });
      expect(res)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });

    it("nao recebendo dados", async () => {
      const res = await service.create({});
      expect(res)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });

  describe("criar ja existente", () => {
    before(() => {
      sinon.stub(product, "find").resolves(true);
    });
    after(() => {
      product.find.restore();
    });

    it("criar existente", async () => {
      const ls = await service.create({ name: "sdf sdsdf", quantity: 3 });
      console.log(ls);
      expect(ls).to.be.an("object");
    });
  });

  describe("deletar", () => {
    it("recebendo id invalido", async () => {
      const ls = await service.remove("thisisnotanid");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });

  describe("Get", () => {
    it("recebendo id invalido", async () => {
      const ls = await service.get("thisisnotanid");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });

    it("recebendo id valido", async () => {
      const ls = await service.get("619cd1fdcb37f41e6be0e12a");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "not_found");
    });
  });

  describe("update", () => {
    it("recebendo id invalido", async () => {
      const ls = await service.get("thisisnotanid");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });

    it("recebendo id valido, produto invalido", async () => {
      const ls = await service.update("619cd1fdcb37f41e6be0e12a", {
        name: "abc",
        quantity: "1",
      });
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });
});

describe("service de sales", () => {
  const product = require("../../models/document")("find");
  const service = require("../../services/sale");
  describe("listar", () => {
    before(() => {
      sinon.stub(product, "find").resolves([1, 2, 3]);
    });
    after(() => {
      product.find.restore();
    });

    it("listar", async () => {
      const ls = await service.list();
      expect(ls).to.be.an("array");
    });
  });

  describe("criar recebendo invalido", () => {
    before(() => {
      sinon.stub(product, "create").resolves({});
    });
    after(() => {
      product.create.restore();
    });

    it("recebendo dados invalidos", async () => {
      const res = await service.create({ name: "sdf", quantity: "2" });
      expect(res)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });

    it("nao recebendo dados", async () => {
      const res = await service.create({});
      expect(res)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });

  describe("criar valido", () => {
    const mockSale = [
      { productId: "619cd1fdcb37f41e6be0e12a", quantity: 2 },
      { productId: "619cd201cb37f41e6be0e12b", quantity: 15 },
    ];
    before(() => {
      sinon.stub(product, "find").resolves(true);
    });
    after(() => {
      product.find.restore();
    });
  });

  describe("deletar", () => {
    it("recebendo id invalido", async () => {
      const ls = await service.remove("thisisnotanid");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });

  describe("Get", () => {
    it("recebendo id invalido", async () => {
      const ls = await service.get("thisisnotanid");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "not_found");
    });

    it("recebendo id valido", async () => {
      const ls = await service.get("619cd1fdcb37f41e6be0e12a");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "not_found");
    });
  });

  describe("update", () => {
    it("recebendo id invalido", async () => {
      const ls = await service.get("thisisnotanid");
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "not_found");
    });

    it("recebendo id valido, produto invalido", async () => {
      const ls = await service.update("619cd1fdcb37f41e6be0e12a", {
        name: "abc",
        quantity: "1",
      });
      expect(ls)
        .to.be.an("object")
        .that.have.property("err")
        .that.have.property("code", "invalid_data");
    });
  });
});
