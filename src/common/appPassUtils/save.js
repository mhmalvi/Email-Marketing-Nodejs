const AppPassword = require("../../../models").AppPassword;

const save = async (data) => {
  return await AppPassword.create({
    email: data.email,
    app_password: data.appPassword,
    user_id: data.userID,
    provider: data.provider,
  });
};
module.exports = { save };
