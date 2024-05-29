const Token = require("../../models").Token;

async function saveToken(data) {
  // const token = new Token({
  //   email: data.email,
  //   accessToken: data.accessToken,
  //   refreshToken: data.refreshToken,
  //   expiryDate: data.expiryDate,
  // });
  // await token.save();
  return await Token.create({
    email: data.email,
    token: data.token,
  });
  
}
// const saveToken = async (data) => {
//   return await Token.create({
//     email: data.email,
//     token: data.token,
//   });
// };
module.exports = { saveToken };
