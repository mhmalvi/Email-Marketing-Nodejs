const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const Subscribe = require("../../../../models").Subscribe;
const stripe_key = Stripe(
  "sk_test_51OtiFcKvZ2nwhLRdtgSm2Kg86tYvxxk0EprDLOKyvqQaZ5ckR3yvjAmQxoff7RuWc2bBHdpv1c56wutQin2b2IYk00jbIXmUId"
);

const test = async () => {
  const formattedDate = new Date();
  formattedDate.setHours(0, 0, 0, 0);
  formattedDate.setMinutes(0, 0, 0, 0);
  formattedDate.setSeconds(0, 0, 0, 0);
  const date_in_milliseconds = formattedDate.getTime();
    console.log(date_in_milliseconds);
    
  const subscriptions = await Subscribe.findAll({});
  subscriptions.forEach(async (data) => {
    let milliseconds = data.current_period_end * 1000;
    let endDate = new Date(milliseconds);
    endDate.setHours(0, 0, 0, 0);
    endDate.setMinutes(0, 0, 0, 0);
    endDate.setSeconds(0, 0, 0, 0);
    const end_date_in_milliseconds = endDate.getTime();
    console.log(end_date_in_milliseconds);

    let startDate_milliseconds = data.current_period_end * 1000;
    let startDate = new Date(startDate_milliseconds);
    startDate.setHours(0, 0, 0, 0);
    startDate.setMinutes(0, 0, 0, 0);
    startDate.setSeconds(0, 0, 0, 0);
    const start_date_in_milliseconds = endDate.getTime();
    console.log(end_date_in_milliseconds);
    if (date_in_milliseconds > start_date_in_milliseconds) {
      if (data.product_selection_status == 1) {
        await Subscribe.update(
          {
            product_selection_status: 0,
          },
          {
            where: {
              userID: data.userID,
            },
          }
        );
      }
    }
    if (date_in_milliseconds > end_date_in_milliseconds) {
      if (data.product_selection_status == 0) {
        await Subscribe.update(
          {
            product_selection_status: 1,
          },
          {
            where: {
              userID: data.userID,
            },
          }
        );
      }
    }
  });
};

module.exports = { test };
