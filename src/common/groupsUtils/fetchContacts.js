const Contact = require("../../../models").Contact;

module.exports.fetchContacts = async (user_id) => {
  return await Contact.findAll({ where: { user_id: user_id } });
};

module.exports.fetchGroups = async (user_id) => {
  return await Contact.findAll({ where: { user_id: user_id } });
};
module.exports.fetchGroupsPagination = async (user_id) => {
  return await Contact.findAll({ where: { user_id: user_id } });
};
