import createPayment from "../src/use_cases/payment/add";
import paymentRepository from "../src/repository/paymentRepository";
import paymentMercadoPago from "../src/use_cases/payment/addMercadoPago";

jest.mock("../src/repository/paymentRepository");
jest.mock("../src/use_cases/payment/addMercadoPago");

describe("createPayment function", () => {
  beforeEach(() => {
    paymentRepository.mockClear();
    paymentMercadoPago.mockClear();
  });

  it("should return an error message if status, order, or description is missing", async () => {
    const result = await createPayment(
      "",
      "order1",
      100,
      "pending",
      ["item1", "item2"],
      new Date(),
      new Date()
    );
    expect(result).toBe("Order and Status fields cannot be empty");
  });

  it("should call the paymentRepository.add method with the new payment", async () => {
    const mockPaymentRepository = {
      add: jest.fn(),
    };

    paymentRepository.mockReturnValue(mockPaymentRepository);

    await createPayment(
      "test description",
      "order1",
      100,
      "pending",
      ["item1", "item2"],
      new Date(),
      new Date()
    );

    expect(mockPaymentRepository.add).toHaveBeenCalledTimes(1);
    expect(mockPaymentRepository.add).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should call paymentMercadoPago with the new payment", async () => {
    const mockPaymentRepository = {
      add: jest.fn(),
    };
    paymentRepository.mockReturnValue(mockPaymentRepository);

    const mockNewPayment = {
      description: "Payment for order",
      order: "123456",
      value: 100.0,
      status: "pending",
      items: ["item1", "item2"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await createPayment(
      mockNewPayment.description,
      mockNewPayment.order,
      mockNewPayment.value,
      mockNewPayment.status,
      mockNewPayment.items,
      mockNewPayment.createdAt,
      mockNewPayment.updatedAt
    );

    expect(paymentMercadoPago).toHaveBeenCalledTimes(1);
  });
});
