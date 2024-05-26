const AppPassword = require("../../../models").AppPassword;

const updateOne = async (data) => {
  console.log(data);
  return await AppPassword.update(
    { email: data.email, app_password: data.app_password },
    { where: { email: data.email, user_id: data.userID } }
  );
};

module.exports = { updateOne };
