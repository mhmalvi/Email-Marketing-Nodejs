const Contact = require("../../../models").Contact;

const fetchByGroup = async (user_id, group) => {
  var contactsArray = [];
  var count = 0;
  const contacts = await Contact.findAll({
    where: { user_id: user_id },
    order: [["id", "DESC"]],
    limit: size,
    offset: offset,
  });
  contacts.forEach((contact) => {
    if (contact.json.group && contact.json.group === group) {
      contactsArray.push(contact);
    }
  });
  return contactsArray;
};

module.exports = { fetchByGroup };
