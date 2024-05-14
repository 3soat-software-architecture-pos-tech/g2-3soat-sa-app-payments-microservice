import { When, Given, Then } from "@cucumber/cucumber";
import createPayment from "../src/entities/Payment.js";
import paymentRepository from "../src/repository/paymentRepository.js";
const dbRepository = paymentRepository();

process.env.DB_RDS_HOST = "payments-service.cvgfuyxmkwzh.us-east-1.rds.amazonaws.com"
process.env.DB_RDS_USER = "root"
process.env.DB_RDS_PASS = "pVqBnUKwKG4yWASKrtbc"
process.env.DB_RDS_DATABASE_NAME = "payments-service"

Given("a description {string}", function (description) {
  this.description = description;
});

Given("an order {string}", function (order) {
  this.order = order
});

Given("a value of {int}", function (amount) {
  this.amount = amount
});

Given("a status {string}", function (status) {
  this.status = status
});

Given("items [{string}, {string}]", function (item1, item2) {
  this.items = [item1, item2]
});

Given("a creation date {string}", function (createdAt) {
  this.createdAt = createdAt
});

Given("an update date {string}", function (updatedAt) {
  this.updatedAt = updatedAt
});

When("the createPayment function is called", function () {
  this.newPayment = new createPayment(this.description, this.order, this.amount, this.status, this.items, this.createdAt, this.updatedAt)
});

Then(
  "a payment with body {string} should be added to the payment repository",
  function (body) {
    dbRepository.add(body)
  }
);

Then("a MercadoPago payment process should be initiated", function () {
  this.newPayment.paymentMercadoPago
});
