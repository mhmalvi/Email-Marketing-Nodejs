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
  });
  if (users.length > 0) {
    users.forEach(async (element) => {
      await logger.debug("curr", new Date());
      await logger.debug("db", element.updatedAt);
      const addTwentyMinutes = new Date(
        element.updatedAt.setMinutes(element.updatedAt.getMinutes() + 20)
      );
      await logger.debug("db twenty", addTwentyMinutes);

      if (new Date() >= addTwentyMinutes) {
        element.otp = null;
        await element.save();
      }
    });
  }
};

module.exports = { deleteOTPCron };
