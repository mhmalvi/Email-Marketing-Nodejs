const AppPassword = require("../../../models").AppPassword;

const fetchOne = async (data) => {
  return await AppPassword.findOne({
    where: { id: data.email, user_id: data.userID },
  });
};
module.exports = { fetchOne };
