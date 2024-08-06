const Stripe = require("stripe");
const Subscribe = require("../../../../models").Subscribe;
const stripe_key = Stripe(process.env.STRIPE_KEY);

const blockSubscription = async () => {
  const formattedDate = new Date(); //////// js current time
  console.log("curr time", formattedDate);
  formattedDate.setHours(0, 0, 0, 0);
  formattedDate.setMinutes(0, 0, 0, 0);
  formattedDate.setSeconds(0, 0, 0, 0);
  const date_in_milliseconds = formattedDate.getTime(); /////////current datetime to millisecond
  console.log(date_in_milliseconds);
  // current datetime
  const subscriptions = await Subscribe.findAll({}); //////// fetch all subscriptions from db
  subscriptions.forEach(async (data) => {
    // let milliseconds = data.current_period_end * 1000; /////////convert end time to milliseconds
    let endDate = new Date(data.current_period_end); ////////// convert end time millisecond to datetime
    console.log("end time", endDate);
    endDate.setHours(0, 0, 0, 0);
    endDate.setMinutes(0, 0, 0, 0);
    endDate.setSeconds(0, 0, 0, 0);
    const end_date_in_milliseconds = endDate.getTime(); ////// convert end time again to millisecond
    console.log(end_date_in_milliseconds);
    // end date

    if (date_in_milliseconds > end_date_in_milliseconds) {
      data.price = "free";
      data.amount = 0;
      data.expDate = null;
      data.subscriptionID = null;
      data.save();
    }
    console.log(data);
  });
};

module.exports = { blockSubscription };
