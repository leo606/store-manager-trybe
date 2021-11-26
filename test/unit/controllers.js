const sinon = require("sinon");
const { expect } = require("chai");

const serviceProduct = require("../../services/product");

describe("controller products", () => {
  describe("create", () => {
    const controllerCreate = require("../../controllers/products/create");
    const response = {};
    const request = {};
    let next = sinon.stub().returns((c) => {});

    describe("erro", () => {
      before(() => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
      after(() => {
        sinon.restore();
      });

      it("sem body chama next", async () => {
        await controllerCreate(request, response, next);
        expect(
          next.calledWith({
            message: "must inform name, qty",
            code: "invalid_data",
          })
        );
      });
    });

    describe("service retorna erro", () => {
      before(() => {
        request.body = { name: "khkj jsh df", quantity: 9 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(serviceProduct, "create")
          .resolves({ err: { message: "", code: "" } });
      });
      after(() => {
        sinon.restore();
      });

      it("sem body chama next", async () => {
        await controllerCreate(request, response, next);
        expect(next.calledWith({ err: { message: "", code: "" } })).to.be.equal(
          true
        );
      });
    });

    describe("service retorna ok", () => {
      before(() => {
        request.body = { name: "khkj jsh df", quantity: 9 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(serviceProduct, "create")
          .resolves({ name: "khkj jsh df", quantity: 9 });
      });
      after(() => {
        sinon.restore();
      });

      it("chama res", async () => {
        await controllerCreate(request, response, next);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
    });
  });

  describe("delete", () => {
    const controllerDelete = require("../../controllers/products/delete");
    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => {
      sinon.restore();
    });
  });
});
