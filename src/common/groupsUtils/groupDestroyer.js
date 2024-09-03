const Contact = require("../../../models").Contact;
module.exports.groupDestroyer = async (userID, group) => {
  return await Contact.destroy({
    where: { user_id: userID, group: group },
  });
};
