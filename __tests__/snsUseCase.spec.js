import snsGatewayAdpater from "../src/application/snsGateway";
import Sns from "../src/entities/Sns.js";
import createNotification from "../src/use_cases/notification/sns.js";

jest.mock("../src/api/services/sns", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../src/application/snsGateway");
jest.mock("../src/entities/Sns.js", () => {
    return jest.fn().mockImplementation((message) => {
      return {
        getMessage: () => message
      };
    });
  });

describe("snsGatewayAdapter", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send a notification with the provided message", () => {
    const message = "Test message";
    const snsMessageMock = {
      getMessage: jest.fn().mockReturnValue(message)
    };
    const snsGatewayMock = {
      sendSNSNotification: jest.fn()
    };
    snsGatewayAdpater.mockReturnValue(snsGatewayMock);
    Sns.mockReturnValue(snsMessageMock);

    createNotification(message);

    expect(snsMessageMock.getMessage).toHaveBeenCalled();
    expect(snsGatewayMock.sendSNSNotification).toHaveBeenCalledWith(message);
  });
});