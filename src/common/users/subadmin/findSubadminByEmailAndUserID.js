const Subadmin = require("../../../../models").Subadmin;

const findSubadminByEmailAndUserID = async (email, userID) => {
  return await Subadmin.findOne({ where: { email: email, userID: userID } });
};

module.exports = { findSubadminByEmailAndUserID };
