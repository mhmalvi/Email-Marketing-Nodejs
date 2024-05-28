const AppPassword = require("../../../models").AppPassword;

const fetchAll = async (userID) => {
  let google = await AppPassword.findOne({
    where: { user_id: userID, provider:"Google" },
  })
  console.log(google);
  // google = google?google:null
  let yahoo = await AppPassword.findOne({
    where: { user_id: userID, provider:"Yahoo" },
  })? await AppPassword.findOne({
    where: { user_id: userID, provider:"Yahoo" },
  }):null
  let outlook = await AppPassword.findOne({
    where: { user_id: userID, provider:"Outlook" },
  })?await AppPassword.findOne({
    where: { user_id: userID, provider:"Outlook" },
  }):null

  return emails = {
    google,yahoo,outlook
  }
};
module.exports = { fetchAll };
