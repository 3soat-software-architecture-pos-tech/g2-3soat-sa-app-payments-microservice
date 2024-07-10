import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../swagger-output.json' assert { type: "json" };

import bodyParser from "body-parser";

export default function routes(app, express){
  app.use(bodyParser.json());
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
}

