import createNewPayment from "../../api/services/payment.js";
import getQrCodeFile from "../../qrcode/generateQrCode.js";
import createNotification from "../notification/sns.js";
import createSQSNotification from "../notification/sqs.js";

export default async function addPayment(data) {
  if (!data) return "data can not be empty";

  const payment = {
    description: data.getDescription(),
    external_reference: `Order ${data.getOrder()}`,
    notification_url: process.env.WEBHOOK_URL,
    total_amount: data.getValue(),
    items: data.getItems(),
    title: "Product Order",
  };

  try {
    const response = await createNewPayment(payment);

    const { qr_data } = response.data;
    if (qr_data) getQrCodeFile(qr_data);

    if (response.status === 201) {
      createNotification(JSON.stringify(payment));
    }

    return response.data.qr_data;
  } catch (error) {
    console.log(error)
    createSQSNotification(JSON.stringify(payment));
  }

}
