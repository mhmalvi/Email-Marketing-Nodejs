const Subadmin = require("../../../../models").Subadmin;
const bcrypt = require("bcrypt");

const createSubAdminUtils = async (data) => {
  var userID = [];
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    if (salt) {
      const password = await bcrypt.hash(data.password, salt);
      userID.push(data.userID);
      return await Subadmin.create({
        userName: data.userName,
        email: data.email,
        password: password,
        userID: JSON.stringify(userID),
      });
    }
  } catch (error) {
    return error;
  }
};
module.exports = { createSubAdminUtils };
