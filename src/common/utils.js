const Token = require("../../models").Token;

async function saveToken(data) {
  return await Token.create({
    email: data.email,
    token: data.token,
    userId: data.userID,
  });
}
async function saveSubAdminToken(data) {
  return await Token.create({
    semail: data.email,
    satok: data.token,
    said: data.userID,
  });
}

module.exports = { saveToken, saveSubAdminToken };
