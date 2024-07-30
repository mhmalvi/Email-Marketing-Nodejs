const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const Subscribe = require("../../../../models").Subscribe;
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const test = async (req, res) => {
  const date = new Date();
    //   const formattedDate = date.toISOString().split("T")[0];
    const formattedDate = '2024-08-30'
  const date_in_seconds = Math.floor(formattedDate.getTime() / 1000);
  const subscription = await stripe_key.subscriptions.retrieve(
    "sub_1PiAhYKvZ2nwhLRd77kPChW9"
  );

  const subscriptions = await Subscribe.findAll({});
  subscriptions.forEach(async (data) => {
    let milliseconds = data.current_period_end * 1000;
    //   let endDate = new Date(milliseconds);
      const milliseconds_in_seconds = Math.floor(milliseconds / 1000);
      const formattedEndDate = endDate.toISOString().split("T")[0];
      
    if (date_in_seconds == milliseconds_in_seconds) {
    //   Subscribe.update(
    //       {
    //         product_selection_status:
    //     },
    //     {
    //       userID: data.userID,
    //     }
        //   );
        return true
    } else {
        return false
    }
  });
  res.json(subscriptions);
};

module.exports = { test };
