const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../../../models").User;
const deleteOTP = async () => {
  const users = await User.findAll({
    where: {
      otp: {
        [Op.ne]: null,
        [Op.not]: 0,
      },
    },
  });
  users.forEach(async (element) => {
    await console.log("curr", new Date());
    await console.log("db", element.updatedAt);
  });
};

module.exports = { deleteOTP };
