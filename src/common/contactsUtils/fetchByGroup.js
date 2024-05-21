const Contact = require("../../../models").Contact;

const fetchByGroup = async (user_id, group) => {
  var contactsArray = [];
  const contacts = await Contact.findAll({
    where: { user_id: user_id },
  });
  contacts.forEach((contact) => {
    if (contact.json.group && contact.json.group === group) {
      contactsArray.push(contact);
    }
  });
  return contactsArray;
};

module.exports = { fetchByGroup };
