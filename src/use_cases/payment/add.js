import payment from "../../entities/Payment.js";
import paymentRepository from "../../application/paymentGateway.js";
import paymentMercadoPago from '../../use_cases/payment/addMercadoPago.js'

const dbRepository = paymentRepository();

export default function createPayment(
  description,
  order,
  value,
  status,
  items,
  createdAt,
  updatedAt,
){
  if (!status || !order || !description) {
    return Promise.resolve(`Order and Status fields cannot be empty`);
  }

  const newPayment = payment(description, order, value, status, items, createdAt, updatedAt)
  dbRepository.add(newPayment);
  return paymentMercadoPago(newPayment);
}