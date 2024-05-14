import paymentRepositoryMySqlDB from "../repository/paymentRepository.js";

export default function paymentGateway() {

  const add = (payment) => paymentRepositoryMySqlDB().add(payment);

  return {
    add,
  }
}