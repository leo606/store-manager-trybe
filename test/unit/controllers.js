const sinon = require("sinon");
const { expect } = require("chai");

const serviceProduct = require("../../services/product");
const { request, response } = require("express");

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
    let next = sinon.stub().returns((c) => {});

    describe("deletar produto erro", () => {
      before(() => {
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "remove").resolves({
          err: { message: "Wrong id format", code: "invalid_data" },
        });
      });

      after(() => {
        sinon.restore();
      });
      it("chama next", async () => {
        await controllerDelete(request, response, next);
        expect(
          next.calledOnceWith({
            err: { message: "Wrong id format", code: "invalid_data" },
          })
        ).to.be.equal(true);
      });
    });

    describe("deletar produto ok", () => {
      before(() => {
        request.params = { id: "thisisarealid" };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "remove").resolves({
          name: "product name",
          quantity: 8,
        });
      });

      after(() => {
        sinon.restore();
      });
      it("retorna status 200", async () => {
        await controllerDelete(request, response, next);
        expect(response.status.calledOnceWith(200)).to.be.equal(true);
      });
    });
  });

  describe("get", () => {
    const controllerGet = require("../../controllers/products/get");
    let next = sinon.stub().returns((c) => {});

    describe("buscar produto erro", () => {
      before(() => {
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "remove").resolves({
          err: { message: "Wrong id format", code: "invalid_data" },
        });
      });

      after(() => {
        sinon.restore();
      });
      it("chama next", async () => {
        await controllerGet(request, response, next);
        expect(
          next.calledOnceWith({
            err: { message: "Wrong id format", code: "invalid_data" },
          })
        ).to.be.equal(true);
      });
    });

    describe("buscar produto ok", () => {
      before(() => {
        request.params = { id: "thisisarealid" };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "get").resolves({
          name: "product name",
          quantity: 8,
        });
      });

      after(() => {
        sinon.restore();
      });
      it("retorna status 200", async () => {
        await controllerGet(request, response, next);
        expect(response.status.calledOnceWith(200)).to.be.equal(true);
      });
    });

  });

  describe("list", () => {
    const controllerList = require("../../controllers/products/list");
    let next = sinon.stub().returns((c) => {});

    describe("buscar produto ok", () => {
      before(() => {

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "list").resolves([{
          name: "product name",
          quantity: 8,
        }]);
      });

      after(() => {
        sinon.restore();
      });
      it("retorna status 200", async () => {
        await controllerList(request, response, next);
        expect(response.status.calledOnceWith(200)).to.be.equal(true);
      });
    });

  });

  describe("update", () => {
    const controllerUpdate = require("../../controllers/products/update");
    const response = {};
    const request = {};
    let next = sinon.stub().returns((c) => {});

    describe("erro", () => {
      before(() => {
        request.body = {};
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
      after(() => {
        sinon.restore();
      });

      it("sem body chama next", async () => {
        await controllerUpdate(request, response, next);
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
          .stub(serviceProduct, "update")
          .resolves({ err: { message: "", code: "" } });
      });
      after(() => {
        sinon.restore();
      });

      it("sem body chama next", async () => {
        await controllerUpdate(request, response, next);
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
          .stub(serviceProduct, "update")
          .resolves({ name: "khkj jsh df", quantity: 9 });
      });
      after(() => {
        sinon.restore();
      });

      it("chama res", async () => {
        await controllerUpdate(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});

describe("controller sales", () => {
  describe("create", () => {
    const controllerCreate = require("../../controllers/sales/create");
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
    let next = sinon.stub().returns((c) => {});

    describe("deletar produto erro", () => {
      before(() => {
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "remove").resolves({
          err: { message: "Wrong id format", code: "invalid_data" },
        });
      });

      after(() => {
        sinon.restore();
      });
      it("chama next", async () => {
        await controllerDelete(request, response, next);
        expect(
          next.calledOnceWith({
            err: { message: "Wrong id format", code: "invalid_data" },
          })
        ).to.be.equal(true);
      });
    });

    describe("deletar produto ok", () => {
      before(() => {
        request.params = { id: "thisisarealid" };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "remove").resolves({
          name: "product name",
          quantity: 8,
        });
      });

      after(() => {
        sinon.restore();
      });
      it("retorna status 200", async () => {
        await controllerDelete(request, response, next);
        expect(response.status.calledOnceWith(200)).to.be.equal(true);
      });
    });
  });

  describe("get", () => {
    const controllerGet = require("../../controllers/products/get");
    let next = sinon.stub().returns((c) => {});

    describe("buscar produto erro", () => {
      before(() => {
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "remove").resolves({
          err: { message: "Wrong id format", code: "invalid_data" },
        });
      });

      after(() => {
        sinon.restore();
      });
      it("chama next", async () => {
        await controllerGet(request, response, next);
        expect(
          next.calledOnceWith({
            err: { message: "Wrong id format", code: "invalid_data" },
          })
        ).to.be.equal(true);
      });
    });

    describe("buscar produto ok", () => {
      before(() => {
        request.params = { id: "thisisarealid" };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "get").resolves({
          name: "product name",
          quantity: 8,
        });
      });

      after(() => {
        sinon.restore();
      });
      it("retorna status 200", async () => {
        await controllerGet(request, response, next);
        expect(response.status.calledOnceWith(200)).to.be.equal(true);
      });
    });

  });

  describe("list", () => {
    const controllerList = require("../../controllers/products/list");
    let next = sinon.stub().returns((c) => {});

    describe("buscar produto ok", () => {
      before(() => {

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(serviceProduct, "list").resolves([{
          name: "product name",
          quantity: 8,
        }]);
      });

      after(() => {
        sinon.restore();
      });
      it("retorna status 200", async () => {
        await controllerList(request, response, next);
        expect(response.status.calledOnceWith(200)).to.be.equal(true);
      });
    });

  });

  describe("update", () => {
    const controllerUpdate = require("../../controllers/products/update");
    const response = {};
    const request = {};
    let next = sinon.stub().returns((c) => {});

    describe("erro", () => {
      before(() => {
        request.body = {};
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
      after(() => {
        sinon.restore();
      });

      it("sem body chama next", async () => {
        await controllerUpdate(request, response, next);
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
          .stub(serviceProduct, "update")
          .resolves({ err: { message: "", code: "" } });
      });
      after(() => {
        sinon.restore();
      });

      it("sem body chama next", async () => {
        await controllerUpdate(request, response, next);
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
          .stub(serviceProduct, "update")
          .resolves({ name: "khkj jsh df", quantity: 9 });
      });
      after(() => {
        sinon.restore();
      });

      it("chama res", async () => {
        await controllerUpdate(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});
