const Token = require("../../models").Token;

async function saveToken(data) {
  const token = new Token({
    email: data.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiryDate: data.expiryDate,
  });
  await token.save();
}

module.exports = { saveToken };
