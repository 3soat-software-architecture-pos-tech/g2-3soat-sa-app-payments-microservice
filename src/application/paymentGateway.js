import paymentRepositoryMySqlDB from "../repository/paymentRepository.js";

export default function paymentGateway() {

  const add = (payment) => paymentRepositoryMySqlDB().add(payment);
  const findAll = () => paymentRepositoryMySqlDB().findAll();

  return {
    add,
    findAll
  }
}