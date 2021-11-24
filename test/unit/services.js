const sinon = require("sinon");
const { expect } = require("chai");

const product = require("../../models/document")("products");
const service = require("../../services/product");

const productMock = {
  name: "product one",
  quantity: 90,
};

describe("test products", () => {
  before(() => {
    const dbCreateResp = {
      ops: [
        {
          _id: {
            $oid: "6198f2906e81d128301a5052",
          },
          name: "product one",
          quantity: 90,
        },
      ],
    };

    sinon.stub(product, "create").resolves(dbCreateResp);
  });

  describe("inserir um product", () => {
    it("quando o produto está ok", async () => {
      console;
      const ret = await service.create(productMock);

      expect("ret").to.be.an("string");
    });
  });
});
