import createNewPayment from '../../api/services/payment.js';
import getQrCodeFile from '../../qrcode/generateQrCode.js';
import createNotification from '../notification/sns.js';

export default async function addPayment(data) {
	if (!data) return "data can not be empty";

	const payment = {
		"description": data.getDescription(),
		"external_reference":`Order ${data.getOrder()}`,
		"notification_url": process.env.WEBHOOK_URL,
		"total_amount": data.getValue(),
		"items": data.getItems(),
		"title": "Product Order"
	}

	const response = await createNewPayment(payment);
	
	const { qr_data } = response.data;
	if (qr_data) getQrCodeFile(qr_data);

	if(response.status === 201) {
		createNotification(JSON.stringify(payment))
	} else {
		console.log("Erro Pagamento")
	} 

	return response.data.qr_data;
}
