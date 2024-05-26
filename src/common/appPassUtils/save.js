const AppPassword = require("../../../models").AppPassword;

const save = async (data) => {
  return await AppPassword.create({
    email: data.email,
    app_password: data.app_password,
    user_id: data.userID,
  });
};
module.exports = { save };
