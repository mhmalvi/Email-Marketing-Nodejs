const AppPassword = require("../../../models").AppPassword;

const fetchByID = async (data) => {
  return await AppPassword.findOne({
    where: { id: data.id, user_id: data.userID },
  });
};
module.exports = { fetchByID };
