import SQS from '../../entities/sqs.js'
import sqsAdapterGateway from '../../application/sqsGateway.js'

export default function createSQSNotification(message) {
  const sqsMessage = SQS(message)
  sqsAdapterGateway().sendSQSNotification(sqsMessage.getMessage())
}