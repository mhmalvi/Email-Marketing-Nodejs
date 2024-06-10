const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../../../models").User;
const deleteOTP = async () => {
  const users = await User.findAll({
    where: {
      otp: {
        [Op.not]: null,
      },
    },
  });
  users.forEach(async (element) => {
      await console.log(new Date());
      await console.log(element.updatedAt);
  });
};

module.exports = { deleteOTP };
