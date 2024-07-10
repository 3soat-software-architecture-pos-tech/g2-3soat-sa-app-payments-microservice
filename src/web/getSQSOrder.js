import AWS from 'aws-sdk'
import paymentController from "../controllers/paymentController.js";

AWS.config.update({
  accessKeyId: process.env.AWS_CREDENTIALS_ACCESSKEY,
  secretAccessKey: process.env.AWS_CREDENTIALS_SECRETKEY,
  region: process.env.AWS_CREDENTIALS_REGION,
  sessionToken: process.env.AWS_CREDENTIALS_SESSIONTOKEN });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = 'https://sqs.us-east-1.amazonaws.com/689666980793/order-notification';

const params = {
  QueueUrl: queueURL,
  MaxNumberOfMessages: 1,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

export default function receiveMessage () {

  const controller = paymentController()

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.error('Erro ao receber mensagem', err);
    } else if (data.Messages) {

      data.Messages.forEach(message => {

        const messageBody = JSON.parse(message.Body);

        console.log('Mensagem recebida:', messageBody);

        controller.addNewPayment(messageBody)

        const deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: message.ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, (deleteErr, deleteData) => {
          if (deleteErr) {
            console.error('Erro ao excluir mensagem', deleteErr);
          } else {
            console.log('Mensagem excluída com sucesso', deleteData);
          }
        });
      });
    } else {
      console.log('Nenhuma mensagem recebida');
    }
  });
};

