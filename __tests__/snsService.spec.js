import AWS from 'aws-sdk';
import sendSNSNotification from '../src/api/services/sns';

jest.mock('aws-sdk', () => {
  const mockedSNS = {
    publish: jest.fn().mockReturnThis(),
  };
  return {
    config: {
      update: jest.fn(),
    },
    SNS: jest.fn(() => mockedSNS),
  };
});

describe('sendSNSNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.AWS_CREDENTIALS_ACCESSKEY = 'mock_access_key';
    process.env.AWS_CREDENTIALS_SECRETKEY = 'mock_secret_key';
    process.env.AWS_CREDENTIALS_REGION = 'mock_region';
    process.env.AWS_CREDENTIALS_SESSIONTOKEN = 'mock_session_token';
    process.env.AWS_ARN_TOPIC = 'mock_topic_arn';
  });

  it('should update AWS configuration with provided credentials', () => {
    sendSNSNotification('Test Message');
    expect(AWS.config.update).toHaveBeenCalledWith({
      accessKeyId: 'mock_access_key',
      secretAccessKey: 'mock_secret_key',
      region: 'mock_region',
      sessionToken: 'mock_session_token',
    });
  });

  it('should create an SNS client', () => {
    sendSNSNotification('Test Message');
    expect(AWS.SNS).toHaveBeenCalled();
  });

  it('should publish a message to the specified SNS topic', () => {
    const message = 'Test Message';
    sendSNSNotification(message);
    expect(AWS.SNS().publish).toHaveBeenCalledWith({
      Message: message,
      Subject: 'Assunto da mensagem',
      TopicArn: 'mock_topic_arn',
    }, expect.any(Function));
  });
});
