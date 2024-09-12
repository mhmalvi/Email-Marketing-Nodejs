const cron = require("node-cron");
const {
  sendMail,
  updateTable,
} = require("../common/campaignUtils/sendMailInstant");
const {
  blockSubscription,
} = require("../common/cron/CronMethods/blockSubscriptionCron");
const { deleteOTPCron } = require("../common/cron/CronMethods/deleteOTPCron");

cron.schedule("*/50 * * * * *", () => {
  console.log("job");
  sendMail();
  deleteOTPCron();
  // updateTable()
});

cron.schedule("* * * * *", () => {
  blockSubscription();
});
