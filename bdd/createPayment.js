import { When, Given, Then } from "@cucumber/cucumber";
import createPayment from "../src/entities/Payment.js";

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

Then("a MercadoPago payment process should be initiated", function () {
  this.newPayment.paymentMercadoPago
});
