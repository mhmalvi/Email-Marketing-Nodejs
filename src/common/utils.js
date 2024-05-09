const Token = require("../../models").Token;

const saveToken = async (data) => {
  return await Token.create({
    email: data.email,
    token: data.token,
  });
};

module.exports = { saveToken };
