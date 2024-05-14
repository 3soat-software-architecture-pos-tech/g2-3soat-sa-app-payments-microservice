import paymentController from "../controllers/paymentController.js";

export default function paymentRoutes(express) {
  const router = express.Router();
  const controller = paymentController();

  router.route('/').post(controller.addNewPayment,
    // swagger.tags = ['Payment']
    // swagger.description = 'Endpoint to add a payment.'

    /* swagger.parameters['newPayment'] = {
               in: 'body',
               description: 'Information payment.',
               required: true,
               schema: { $ref: "#/definitions/AddPayment" }
        } */
    //schema: { $ref: "#/definitions/AddPayment" }
  );
  return router;
}