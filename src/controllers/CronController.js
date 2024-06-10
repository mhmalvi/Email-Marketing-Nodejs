const cron = require("node-cron");
const { sendMail } = require("../common/campaignUtils/sendMailInstant");
const { deleteOTPCron } = require("../common/cron/CronMethods/deleteOTPCron");

cron.schedule("* * * * *", () => {
  console.log("job");
  sendMail();
  deleteOTPCron();
});
