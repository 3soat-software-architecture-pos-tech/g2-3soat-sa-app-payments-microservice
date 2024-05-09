import swaggerAutogen from 'swagger-autogen';
const document = {
    info: {
      title: 'API Sistema de pedidos',
      description: 'Pos-Tech 3SOAT'
    },
    host: 'localhost:80',
    definitions: {
        AddPayment: {
            $description: "Description of payment",
            $order: "ID Order generated",
            $status: "Pending",
            $value: 100,
            $items: [
                {
                    "sku_number": "A123K9191938",
                    "category": "marketplace",
                    "title": "Point Mini",
                    "description": "This is the Point Mini",
                    "unit_price": 100,
                    "quantity": 1,
                    "unit_measure": "unit",
                    "total_amount": 100
                }
            ]
        }
    }
  };

swaggerAutogen()('./swagger-output.json', ['./src/web/index.js'], document);