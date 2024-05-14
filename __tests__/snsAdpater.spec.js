import snsGatewayAdpater from "../src/application/snsGateway";
import Sns from "../src/entities/Sns.js";
import sendSNSNotificationGateway from "../src/api/services/sns";

jest.mock("../src/api/services/sns", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("snsGatewayAdapter", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and send SNS notification", () => {
    const message = "Test message";
    const snsMessage = Sns(message);
    snsGatewayAdpater().sendSNSNotification(snsMessage.getMessage());

    expect(sendSNSNotificationGateway).toHaveBeenCalledWith(message);
  });
});