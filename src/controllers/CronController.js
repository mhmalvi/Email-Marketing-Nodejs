const cron = require("node-cron");
const { sendMail,updateTable } = require("../common/campaignUtils/sendMailInstant");
const { deleteOTPCron } = require("../common/cron/CronMethods/deleteOTPCron");


cron.schedule("*/10 * * * * *", () => {
  console.log("job");
  sendMail();
  deleteOTPCron();
  updateTable()
});
