import snsGatewayAdpater from "../../application/snsGateway.js";
import Sns from "../../entities/Sns.js";

export default function createNotification(message) {
    const snsMessage = Sns(message);
    snsGatewayAdpater().sendSNSNotification(snsMessage.getMessage())
}