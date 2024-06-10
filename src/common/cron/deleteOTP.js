const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../../../models").User;
const deleteOTP = async () => {
  const users = await User.findAll({
    where: {
      otp: {
        [Op.ne]: null,
        [Op.ne]: 0,
      },
    },
  });
  users.forEach(async (element) => {
    await console.log("curr", new Date());
    await console.log("db", element.updatedAt);
    const addTwentyMinutes = new Date(
      element.updatedAt.setMinutes(element.updatedAt.getMinutes() + 2)
    );
    await console.log("db twenty", addTwentyMinutes);

    if (new Date() >= addTwentyMinutes) {
      element.otp = null;
      await element.save();
    }
  });
};

module.exports = { deleteOTP };
