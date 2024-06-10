const cron = require("node-cron");
const { sendMail } = require("../../common/campaignUtils/sendMailInstant");
const { deleteOTPCron } = require("./CronMethods/deleteOTPCron");

cron.schedule("* * * * *", () => {
  console.log("job");
  sendMail();
  deleteOTPCron();
});

