import express from "express";
import routes from "./web/index.js";
import receiveMessage from "./web/getSQSOrder.js";

const app = express();
app.use(express.json());

routes(app, express);
setInterval(receiveMessage, 100)

export default app;
