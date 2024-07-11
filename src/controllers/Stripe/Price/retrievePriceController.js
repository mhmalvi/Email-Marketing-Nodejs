const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);
const { fieldsValidation } = require("../../../../config/utils");
const priceByProductID = async (req, res) => {
    const { priceID } = req.body
    const requiredFields = { priceID };
    const missingFields = await fieldsValidation(requiredFields);
    if (missingFields.length > 0) {
      res.status(422).json({
        message: `Missing fields are ${missingFields.join(", ")}`,
        status: 422,
      });
    } else {
        const price = await stripe_key.prices.retrieve(priceID);
        // console.log(price);
        if (price) {
            res.status(200).json(price)
        } else {
            res.status(200).json({
                message: 'not found',
                status:404,
                
            });
        }
    }
}

module.exports = { priceByProductID };