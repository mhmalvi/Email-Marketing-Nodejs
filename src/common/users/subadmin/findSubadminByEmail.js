const Subadmin = require("../../../../models").Subadmin;

const findSubadminByEmail = async (email) => {
  return await Subadmin.findOne({ where: { email: email } }, { limit: 1 });
};

module.exports = { findSubadminByEmail };
