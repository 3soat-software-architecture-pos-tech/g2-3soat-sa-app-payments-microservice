import sendSNSNotificationGateway from "../api/services/sns.js";

export default function snsGateway() {
  const sendSNSNotification = (message) => sendSNSNotificationGateway(message);

  return {
    sendSNSNotification,
  };
}
