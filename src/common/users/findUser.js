const User = require("../../../models").User;

const findUser = async (userID) => {
  return await User.findOne({ where: { id: userID } });
};
module.exports = { findUser };
