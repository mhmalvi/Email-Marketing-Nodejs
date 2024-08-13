const Subadmin = require("../../../../models").Subadmin;

const findSubadminByEmail = async (email, userID) => {
  return await Subadmin.findOne({ where: { email: email, userID: userID } });
};

module.exports = { findSubadminByEmail };
