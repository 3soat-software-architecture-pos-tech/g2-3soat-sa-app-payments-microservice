import paymentGateway from "../../application/paymentGateway.js";

export default function getAAllPayments() {
  return paymentGateway().findAll();
}