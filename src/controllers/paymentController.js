import useCaseCreate from '../use_cases/payment/add.js'

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

  return {
    addNewPayment,
  };
}