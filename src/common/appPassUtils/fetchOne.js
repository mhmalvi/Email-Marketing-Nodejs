const AppPassword = require("../../../models").AppPassword;

const fetchOne = async (data) => {
  return await AppPassword.findOne({
    where: { email: data.email,user },
  });
};
module.exports = { fetchOne };
