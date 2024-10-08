import db from '../config/dbConnectMysql.js';

export default function paymentRepositoryMongoDB() {
  const add = async (paymentEntity) => {
    return new Promise((resolve, reject) => {
      // Begin transaction
      db.beginTransaction((beginError) => {
        if (beginError) {
          return reject(beginError);
        }
        const insertQuery = "INSERT INTO payments (orderNumber, description, totalOrderPrice, orderStatus_id, createdAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";

        db.query(insertQuery, [paymentEntity.getOrder(), paymentEntity.getDescription(),paymentEntity.getValue() ,paymentEntity.getStatus(), paymentEntity.getCreatedAt()], (error, result) => {
          if (error) {
            // Rollback the transaction if there is an error
            return db.rollback(() => reject(error));
          }

          db.commit((commitError) => {
            if (commitError) {
              // Rollback the transaction if there is an error during commit
              return db.rollback(() => reject(commitError));
            }


            // Resolve with the order details
            resolve(result);
          });
        });
      });
    });
  };

  const findAll = async () => {
    return new Promise((resolve, reject) => {

      // Begin transaction
      db.beginTransaction((beginError) => {
        if (beginError) {
          return reject(beginError);
        }

        const select = "SELECT * FROM payments";
        db.query(select, (queryError, result) => {
          if (queryError) {
            // Rollback the transaction if there is an error
            return db.rollback(() => reject(queryError));
          }

          // Commit the transaction and close the connection
          db.commit((commitError) => {
            if (commitError) {
              // Rollback the transaction if there is an error during commit
              return db.rollback(() => reject(commitError));
            }

            // Resolve with the query result
            resolve(result);
          });
        });
      });
    });
  };

  return {
    add,
    findAll
  }
}


