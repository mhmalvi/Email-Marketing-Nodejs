const Token = require("../../models").Token;

const saveToken = async (data) => {
  await Token.create({
    email: data.email,
    token: data.token,
  });
};

module.exports = { saveToken };
