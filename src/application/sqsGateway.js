import sqsNotification from "../api/services/sqs.js";

export default function sqsGateway() {
  const sendSQSNotification = (message) => sqsNotification(message);

  return {
    sendSQSNotification,
  };
}
