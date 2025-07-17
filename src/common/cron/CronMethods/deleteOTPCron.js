const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../../../../models").User;
const logger = require("../../utils/logger");
const deleteOTPCron = async () => {
  const users = await User.findAll({
    where: {
      otp: {
        [Op.ne]: null,
        [Op.ne]: 0,
      },
    },
  }); /////////////////  fetch users list where otp is not equal to 0 and not equal to null ///////////
  ////////////////////////////////////////////////////////
  if (users.length > 0) {
    users.forEach(async (element) => {
      await logger.debug("curr", new Date());
      await logger.debug("db", element.updatedAt);
      const addTwentyMinutes = new Date(
        element.updatedAt.setMinutes(element.updatedAt.getMinutes() + 20)
      ); ////// add 20 minutes to updatedAt datetime ///////
      await logger.debug("db twenty", addTwentyMinutes);

      if (new Date() >= addTwentyMinutes) {
        ////  if current date time is equal or greater than updatedAt+20_minutes delete that otp ////
        element.otp = null;
        await element.save();
      }
    });
  }
};

module.exports = { deleteOTPCron };
