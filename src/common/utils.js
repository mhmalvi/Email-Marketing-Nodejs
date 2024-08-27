const Token = require("../../models").Token;

async function saveToken(data) {
  return await Token.create({
    email: data.email,
    role: data.role,
    token: data.token,
    userId: data.userID,
  });
}
async function saveSubAdminToken(data) {
  return await Token.create({
    semail: data.email,
    role: data.role,
    satok: data.token,
    said: data.userID,
  });
}

module.exports = { saveToken, saveSubAdminToken };
