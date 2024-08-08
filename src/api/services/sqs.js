import AWS from 'aws-sdk'

export default function sqsNotification(message) {
  AWS.config.update({
    accessKeyId: process.env.AWS_CREDENTIALS_ACCESSKEY,
    secretAccessKey: process.env.AWS_CREDENTIALS_SECRETKEY,
    region: process.env.AWS_CREDENTIALS_REGION,
    sessionToken: process.env.AWS_CREDENTIALS_SESSIONTOKEN,
  });

  const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

  const params = {
    QueueUrl: process.env.SQS_ERROR_MERCADOPAGO,
    MessageBody: message,

    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: `OrderId: ${message.orderId}`,
      }
    },
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.error("Erro ao enviar a mensagem:", err);
    } else {
      console.log("Mensagem enviada com sucesso:", data.MessageId);
    }
  });
}
