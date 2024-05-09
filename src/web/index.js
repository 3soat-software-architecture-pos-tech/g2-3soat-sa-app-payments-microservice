import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../swagger-output.json' assert { type: "json" };
import paymentRoutes from './paymentRoutes.js';

import bodyParser from "body-parser";

export default function routes(app, express){
  app.use(bodyParser.json());
  app.use('/payment', paymentRoutes(express));
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
}

