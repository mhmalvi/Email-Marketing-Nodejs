const cron = require("node-cron");
const { sendMail } = require("../common/campaignUtils/sendMailInstant");
const { deleteOTPCron } = require("../common/cron/CronMethods/deleteOTPCron");

const cronJob = async () => {
  cron.schedule("* * * * *", () => {
    console.log("job");
    sendMail();
    deleteOTPCron();
  });
};
module.exports = { cronJob };