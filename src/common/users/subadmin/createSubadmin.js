const Subadmin = require("../../../../models").Subadmin;
const createSubAdminUtils = async (data) => {
  var userID = [];
  userID.push(data.userID);
  return await Subadmin.create({
    userName: data.userName,
    email: data.email,
    password: data.password,
    userID: userID,
  });
};
module.exports = { createSubAdminUtils };
