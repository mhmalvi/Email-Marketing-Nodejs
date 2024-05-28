const AppPassword = require("../../../models").AppPassword;

const fetchAll = async (userID) => {
  let google = AppPassword.findOne({
    where: { user_id: userID, provider:"Google" },
  })?AppPassword.findOne({
    where: { user_id: userID, provider:"Google" },
  }):null
  let yahoo = AppPassword.findOne({
    where: { user_id: userID, provider:"Yahoo" },
  })?AppPassword.findOne({
    where: { user_id: userID, provider:"Yahoo" },
  }):null
  let outlook = AppPassword.findOne({
    where: { user_id: userID, provider:"Outlook" },
  })?AppPassword.findOne({
    where: { user_id: userID, provider:"Outlook" },
  }):null

  return emails = {
    google,yahoo,outlook
  }
};
module.exports = { fetchAll };
