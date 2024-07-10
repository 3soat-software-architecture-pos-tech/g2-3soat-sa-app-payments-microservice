export default function sqs(message) {
  return {
    getMessage: () => message
  }
}