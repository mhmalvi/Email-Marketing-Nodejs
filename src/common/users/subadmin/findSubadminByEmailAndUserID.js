const Subadmin = require("../../../../models").Subadmin;
const { Op } = require("sequelize");
const findSubadminByEmailAndUserID = async (email, userID) => {
  return await Subadmin.findOne({
    where: {
      email: email,
      userID: {
        [Op.like]: `%${user_id}%`,
      },
    },
  });
};

module.exports = { findSubadminByEmailAndUserID };
