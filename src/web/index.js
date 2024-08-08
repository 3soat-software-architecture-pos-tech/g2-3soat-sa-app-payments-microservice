import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../swagger-output.json' assert { type: "json" };
import paymentRoutes from './paymentRoutes.js';
import helmet, {hidePoweredBy} from 'helmet';

import bodyParser from "body-parser";

export default function routes(app, express){

  app.use(hidePoweredBy());
  app.use(bodyParser.json());
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "https://trusted-scripts.com"],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "https://trusted-styles.com"],
        imgSrc: ["'self'", "https://trusted-images.com"],
        fontSrc: ["'self'", "https://trusted-fonts.com"],
        connectSrc: ["'self'", "https://api.trusted.com"],
        frameSrc: ["'self'", "https://trusted-frames.com"],
        frameAncestors: ["'self'"], // Specify sources allowed to frame your content
        formAction: ["'self'"],    // Specify sources allowed to submit forms
      },
    },
  }))

  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use('/payment', paymentRoutes(express));

  app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
  });
}

