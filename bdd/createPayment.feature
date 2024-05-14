Feature: Create Payment

  Scenario: Successful payment creation with MercadoPago
    Given a description "Test payment"
    And an order "12345"
    And a value of 100
    And a status "pending"
    And items ["item1", "item2"]
    And a creation date "2024-05-13"
    And an update date "2024-05-13"
    When the createPayment function is called
    Then a payment with body "order test" should be added to the payment repository
    And a MercadoPago payment process should be initiated

    Examples:
      | description  | order  | value | status    | items        | createdAt   | updatedAt   | errorMessage                            |
      | Test payment | 12345  | 100   |           | ["item1"]    | 2024-05-13  | 2024-05-13  | Order and Status fields cannot be empty |
      |              | 12345  | 100   | pending   | ["item1"]    | 2024-05-13  | 2024-05-13  | Description field cannot be empty       |
      | Test payment |        | 100   | pending   | ["item1"]    | 2024-05-13  | 2024-05-13  | Order field cannot be empty             |
      | Test payment | 12345  |       | pending   | ["item1"]    | 2024-05-13  | 2024-05-13  | Value field cannot be empty             |
