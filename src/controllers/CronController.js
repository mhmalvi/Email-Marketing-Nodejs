const cron = require("node-cron");
const { sendMail } = require("../common/campaignUtils/sendMailInstant");
const { deleteOTPCron } = require("../common/cron/CronMethods/deleteOTPCron");
const subscribe = require("../../models").subscribe;
const user = require("../../models").user;

cron.schedule("*/10 * * * * *", () => {
  console.log("job");
  sendMail();
  deleteOTPCron();
  const updateTable = async () => {
    const users = await user.findAll();
    users.forEach(async (data) => {
      await subscribe.findOrCreate(
        {
          subscription: "free",
          amount: 0,
          interval: 30,
          userID: data.id,
        },
        { where: { userID: userID } }
      );
    });
  };
});
