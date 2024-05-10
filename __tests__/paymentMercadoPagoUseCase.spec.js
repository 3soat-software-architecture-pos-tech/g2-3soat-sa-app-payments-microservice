import addPayment from '../src/use_cases/payment/addMercadoPago.js';
import createNewPayment from '../src/api/services/payment.js';
import getQrCodeFile from '../src/qrcode/generateQrCode.js';
import createNotification from '../src/use_cases/notification/sns.js';

jest.mock('../src/api/services/payment.js');
jest.mock('../src/qrcode/generateQrCode.js');
jest.mock('../src/use_cases/notification/sns.js');

describe('addPayment function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns qr_data when payment is successful', async () => {

    const mockData = {
      getDescription: jest.fn().mockReturnValue('Description'),
      getOrder: jest.fn().mockReturnValue('Order'),
      getValue: jest.fn().mockReturnValue(100),
      getItems: jest.fn().mockReturnValue(['Item 1', 'Item 2']),
    };

    const mockPayment = {
      description: 'Description',
      external_reference: 'Order Order',
      notification_url: process.env.WEBHOOK_URL,
      total_amount: 100,
      items: ['Item 1', 'Item 2'],
      title: 'Product Order',
    };

    const mockResponse = {
      status: 201,
      data: {
        qr_data: 'mocked_qr_data',
      },
    };

    createNewPayment.mockResolvedValue(mockResponse);

    getQrCodeFile.mockImplementation(qr_data => {
      expect(qr_data).toBe('mocked_qr_data');
    });

    createNotification.mockImplementation(payment => {
      expect(payment).toBe(JSON.stringify(mockPayment));
    });

    const result = await addPayment(mockData);

    expect(result).toBe('mocked_qr_data');

    expect(createNewPayment).toHaveBeenCalledWith(mockPayment);

    expect(getQrCodeFile).toHaveBeenCalledWith('mocked_qr_data');

    expect(createNotification).toHaveBeenCalledWith(JSON.stringify(mockPayment));
  });

  it('returns "data can not be empty" when data is not provided', async () => {
    const result = await addPayment(null);
    expect(result).toBe('data can not be empty');
    
    expect(createNewPayment).not.toHaveBeenCalled();
    expect(getQrCodeFile).not.toHaveBeenCalled();
    expect(createNotification).not.toHaveBeenCalled();
  });
});
