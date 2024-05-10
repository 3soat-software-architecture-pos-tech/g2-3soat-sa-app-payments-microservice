import paymentRepository from "../src/repository/paymentRepository";
import db from "../src/config/dbConnectMysql";

jest.mock("../src/config/dbConnectMysql", () => ({
  beginTransaction: jest.fn(),
  query: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(),
}));

describe("paymentRepository", () => {
  describe("add", () => {
    beforeEach(async () => {
      db.beginTransaction.mockClear();
      db.query.mockClear();
      db.commit.mockClear();
      db.rollback.mockClear();
    });

    it("should add a payment to the database", async () => {
      
      const paymentEntity = {
        getOrder: jest.fn().mockReturnValue("order123"),
        getDescription: jest.fn().mockReturnValue("Description of the payment"),
        getValue: jest.fn().mockReturnValue(100),
        getStatus: jest.fn().mockReturnValue(1),
        getCreatedAt: jest.fn().mockReturnValue("2024-05-09 12:00:00"),
      };

      db.beginTransaction.mockImplementation((callback) => callback());
      db.query.mockImplementationOnce((query, values, callback) => {
        callback(null, { insertId: 1 });
      });
      db.commit.mockImplementation((callback) => callback());

      const result = await paymentRepository().add(paymentEntity);

      expect(db.beginTransaction).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.commit).toHaveBeenCalledTimes(1);
      expect(db.rollback).not.toHaveBeenCalled();
      expect(result).toEqual({ "insertId": 1 });
    });

    it("should handle errors during transaction", async () => {
      const paymentEntity = {
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
        updatedAt: Date(),
      };

      const error = new Error("Transaction error");
      db.beginTransaction.mockImplementationOnce((callback) => callback(error));

      await expect(paymentRepository().add(paymentEntity)).rejects.toThrowError(
        error
      );

      expect(db.beginTransaction).toHaveBeenCalledTimes(1);
      expect(db.query).not.toHaveBeenCalled();
      expect(db.commit).not.toHaveBeenCalled();
      expect(db.rollback).not.toHaveBeenCalled();
    });
  });
});
