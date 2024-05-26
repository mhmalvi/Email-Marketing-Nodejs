const AppPassword = require("../../../models").AppPassword;

const save = async (data) => {
  return await AppPassword.create({
    email: data.email,
    app_password: data.app_password,
    UserID: data.UserID,
  });
};
module.exports = { save };
