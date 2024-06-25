const Token = require("../../models").Token;

async function saveToken(data) {
  return await Token.create({
    email: data.email,
    token: data.token,
  });
}
module.exports = { saveToken };
