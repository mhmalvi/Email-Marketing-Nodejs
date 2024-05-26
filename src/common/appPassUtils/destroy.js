const AppPassword = require("../../../models").AppPassword;

const destroy = async (data) => {
  return await AppPassword.destroy({
    where: { id: data.id, user_id: data.userID },
  });
};
module.exports = { destroy };
