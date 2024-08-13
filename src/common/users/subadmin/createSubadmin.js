const Subadmin = require("../../../../models").Subadmin;
const createSubAdminUtils = async (data) => {
  return await Subadmin.create({
    userName: data.userName,
    email: data.email,
    password: data.password,
    userID: data.userID,
  });
};
module.exports = { createSubAdminUtils };
