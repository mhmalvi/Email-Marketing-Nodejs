const AppPassword = require("../../../models").AppPassword;

const fetchOne = async (data) => {
  return await AppPassword.findOne({
    where: { email: data.email, user_id: data.user_id },
  });
};
module.exports = { fetchOne };
