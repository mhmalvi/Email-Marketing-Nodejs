const keys = require('./keys')

// const auth = {
//   type: "OAuth2",
//   user: "megatanjib@gmail.com",
//   clientId: keys.google.clientID,
//   clientSecret: keys.google.clientSecret,
//   refreshToken: keys.google.refresh_token,
// };

const mailoptions = {
  from: "Quemailer <megatanjib@gmail.com>",
  to: "tanjib@quadque.tech",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};
