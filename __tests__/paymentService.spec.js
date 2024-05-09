import createNewPayment from "../src/api/services/payment";
import axiosClient from "../src/api/apiClient";

jest.mock("../src/api/apiClient", () => jest.fn());

describe("createNewPayment function", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules(); 
    process.env = { ...OLD_ENV }; 
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("should make a POST request to the correct endpoint with given data", async () => {
    const data = {
      description: "description teste",
      external_reference: "order teste",
      notification_url: process.env.WEBHOOK_URL,
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
      title: "Product Order",
    };

    const mockPost = jest.fn();
    axiosClient.mockReturnValueOnce({ post: mockPost }); 

    await createNewPayment(data);

    expect(axiosClient).toHaveBeenCalledWith("https://api.mercadopago.com/", {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.TOKEN_VENDEDOR_MP}`,
    });
    
    expect(mockPost).toHaveBeenCalledWith(
      `instore/orders/qr/seller/collectors/${process.env.SELLER_ID}/pos/${ process.env.EXTERNAL_POS_ID}/qrs`,
      JSON.stringify(data)
    );
  });
});
