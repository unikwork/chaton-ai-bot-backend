import { successRes, errorRes } from "../helpers/index.js";
import config from "../config/config.js";
import appleReceiptVerify from "node-apple-receipt-verify";
import moment from "moment";

const subscriptionVerify = async (req, res) => {
  try {
    const { invoice } = req.body;

    appleReceiptVerify.config({
      secret: config.subscription.secretKey,
      environment: [`${config.subscription.environment}`],
    });

    appleReceiptVerify.validate(
      {
        receipt: invoice,
      },
      (err, products) => {
        console.log("err", err);
        console.log("products", products);
        if (err) {
          return errorRes(res, 9000, err);
        }
        if (products && products.length > 0) {
          console.log("iffffffffffff");

          if (moment().isAfter(products[0].expirationDate)) {
            return errorRes(res, 2001);
          }
          if (moment().isBefore(products[0].expirationDate)) {
            return successRes(res, 2002, products[0]);
          }
        } else if (products && products.length == 0) {
          console.log("else ifffffffffffffff");
          return errorRes(res, 200);
        }
      }
    );
  } catch (error) {
    console.log("error", error);
    return errorRes(res, 9000, error);
  }
};

export { subscriptionVerify };

// [{
//     transactionId: '2000000779739835',
//     originalTransactionId: '2000000658808527',
//     bundleId: 'com.asikeyboard',
//     productId: 'Monthly',
//     purchaseDate: 1732014541000,
//     expirationDate: 1732014721000,
//     quantity: 1,
//     web_order_line_item_id: '2000000081352049',
//     webOrderLineItemId: '2000000081352049'
//   }
// ]
