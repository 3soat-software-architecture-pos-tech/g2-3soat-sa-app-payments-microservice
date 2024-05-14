export default function payment(
  description,
  order,
  value,
  status,
  items,
  createdAt,
  updatedAt
) {
  return {
    getDescription: () => description,
    getOrder: () => order,
    getValue: () => value,
    getStatus: () => status,
    getItems: () => items,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
  };
}