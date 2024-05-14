import paymentController from "../src/controllers/paymentController";
import useCaseCreate from "../src/use_cases/payment/add";

jest.mock("../src/use_cases/payment/add.js");

jest.mock('../src/repository/paymentRepository.js', () => ({
  query: jest.fn(),
}));

describe("paymentController", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addNewPayment", () => {
    it("should add a new payment", async () => {
      const db = require('../src/repository/paymentRepository');
      const payment = {
        description: "description teste",
        order: "order teste",
        total_amount: 100,
        status: "WAITING",
        items: [
          {
            sku_number: "A123K9191938",
            category: "marketplace",
            title: "Point Mini",
            description: "This is the Point Mini",
            unit_price: 100,
            quantity: 1,
            unit_measure: "unit",
            total_amount: 100,
          },
        ],
        createdAt: Date(),
        updatedAt: Date()
      };
      db.query.mockResolvedValue(payment);
      useCaseCreate.mockResolvedValue(payment.description, payment.order, payment.total_amount, payment.status, payment.items ,payment.createdAt, payment.updatedAt);

      req.body = {
        description: "description teste",
        order: "order teste",
        total_amount: 100,
        items: [
          {
            sku_number: "A123K9191938",
            category: "marketplace",
            title: "Point Mini",
            description: "This is the Point Mini",
            unit_price: 100,
            quantity: 1,
            unit_measure: "unit",
            total_amount: 100,
          },
        ],
      };

      await paymentController().addNewPayment(req, res, next);

      expect(useCaseCreate).toHaveBeenCalledWith(payment.description, payment.order, payment.total_amount, payment.status,payment.items ,payment.createdAt, payment.updatedAt);
      expect(res.json).toHaveBeenCalled();
    });

    it("should handle errors when adding a new payment", async () => {
      const error = new Error("Add payment error");
      useCaseCreate.mockRejectedValue(error);

      req.body = {
        description: "description teste",
        total_amount: 100,
        items: [
          {
            sku_number: "A123K9191938",
            category: "marketplace",
            title: "Point Mini",
            description: "This is the Point Mini",
            unit_price: 100,
            quantity: 1,
            unit_measure: "unit",
            total_amount: 100,
          },
        ],
      };

      await paymentController().addNewPayment(req, res, next);

      expect(next).toHaveBeenCalledWith(`Payment creation failed`)
    });
  });
});
