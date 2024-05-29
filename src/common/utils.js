const Token = require("../../models").Token;

async function saveToken(data) {
  const token = new Token({
    email: data.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiryDate: data.expiryDate,
  });
  await Token.create({
    email: data.email,
    token: token,
  });
  await token.save();
}
// const saveToken = async (data) => {
//   return await Token.create({
//     email: data.email,
//     token: data.token,
//   });
// };
module.exports = { saveToken };
