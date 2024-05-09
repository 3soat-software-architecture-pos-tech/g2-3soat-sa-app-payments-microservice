import AWS from 'aws-sdk';

export default function sendSNSNotification(message) {
  AWS.config.update({
    accessKeyId: process.env.AWS_CREDENTIALS_ACCESSKEY,
    secretAccessKey: process.env.AWS_CREDENTIALS_SECRETKEY,
    region: process.env.AWS_CREDENTIALS_REGION,
    sessionToken: process.env.AWS_CREDENTIALS_SESSIONTOKEN
  });

  const sns = new AWS.SNS();

  const params = {
    Message: message,
    Subject: "Assunto da mensagem",
    TopicArn: process.env.AWS_ARN_TOPIC,
  };

  sns.publish(params, function (err, data) {
    if (err) {
      console.error("Erro ao publicar na SNS:", err);
    } else {
      console.log("Mensagem publicada com sucesso:", data.MessageId);
    }
  });
}
