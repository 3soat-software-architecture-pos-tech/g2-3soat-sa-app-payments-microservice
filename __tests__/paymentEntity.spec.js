import payment from '../src/entities/Payment'; // importe o arquivo que contém a função payment

describe('Payment', () => {
  const description = 'Payment for order';
  const order = '123456';
  const value = 100.00;
  const status = 'pending';
  const items = ['item1', 'item2'];
  const createdAt = new Date();
  const updatedAt = new Date();

  const paymentInstance = payment(description, order, value, status, items, createdAt, updatedAt);

  test('getDescription should return correct description', () => {
    expect(paymentInstance.getDescription()).toBe(description);
  });

  test('getOrder should return correct order', () => {
    expect(paymentInstance.getOrder()).toBe(order);
  });

  test('getValue should return correct value', () => {
    expect(paymentInstance.getValue()).toBe(value);
  });

  test('getStatus should return correct status', () => {
    expect(paymentInstance.getStatus()).toBe(status);
  });

  test('getItems should return correct items', () => {
    expect(paymentInstance.getItems()).toEqual(items);
  });

  test('getCreatedAt should return correct createdAt', () => {
    expect(paymentInstance.getCreatedAt()).toBe(createdAt);
  });

  test('getUpdatedAt should return correct updatedAt', () => {
    expect(paymentInstance.getUpdatedAt()).toBe(updatedAt);
  });
});
