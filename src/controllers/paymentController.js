import useCaseCreate from '../use_cases/payment/add.js'

export default function paymentController() {
  
	const addNewPayment = async (req, res, next) => {
  
    const { description, order, total_amount, items } = req.body;

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
      .then((payment) => res.json(payment))
      .catch((error) => res.json(next(`Payment creation failed`)));
    };

  return {
		addNewPayment,    
  };
}