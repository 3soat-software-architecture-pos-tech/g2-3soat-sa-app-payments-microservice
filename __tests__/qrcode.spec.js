import getQrCodeFile from '../src/qrcode/generateQrCode'; // Adjust the import path as needed

jest.mock('qrcode', () => ({
  toDataURL: jest.fn((data, callback) => {
    callback(null, 'data:image/png;base64,MockedBase64Data');
  }),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'MockedUUID'),
}));

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn((dir, filename) => `${dir}/${filename}`),
}));

describe('getQrCodeFile', () => {
  it('should generate a temporary link for the QR code', () => {
    const qrData = 'Test QR Data';
    const expectedBase64Data = 'MockedBase64Data';
    const expectedUUID = 'MockedUUID';
    const expectedTempLink = 'http://localhost:3000/MockedUUID.png';

    getQrCodeFile(qrData);
    
    expect(require('qrcode').toDataURL).toHaveBeenCalledWith(qrData, expect.any(Function));
    expect(require('uuid').v4).toHaveBeenCalled();
    expect(require('fs').writeFileSync).toHaveBeenCalledWith(
      'src/qrcode//MockedUUID.png',
      Buffer.from(expectedBase64Data, 'base64')
    );
    expect(require('path').join).toHaveBeenCalledWith('src/qrcode/', 'MockedUUID.png');
  });
});
