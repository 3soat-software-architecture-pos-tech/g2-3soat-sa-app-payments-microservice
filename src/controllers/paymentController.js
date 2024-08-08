import useCaseCreate from '../use_cases/payment/add.js'
import useCasegetAllPayments from '../use_cases/payment/getAll.js'

export default function paymentController() {

  const addNewPayment = async (req) => {

    const { description, order, total_amount, items } = req;

    await useCaseCreate(
      description,
      order,
      total_amount,
      "WAITING",
      items,
      Date(),
      Date()//,
      //dbRepository
    )
  };

  const fetchAllPayments = async (req, res, next) => {
    try{
      await useCasegetAllPayments()
        .then((payments) => {
          if (!payments) {
            res.status(400).json(`No payments found`);
          }
          res.status(200).json(payments);
        })}catch(error){
      res.status(400).json(error.message);
      next(error);
    }
  };

  return {
    addNewPayment,
    fetchAllPayments
  };
}