const AppPassword = require("../../../models").AppPassword;

const fetchAll = async (userID) => {
  return await AppPassword.findAll({
    where: { user_id: userID },
  });
};
module.exports = { fetchAll };
