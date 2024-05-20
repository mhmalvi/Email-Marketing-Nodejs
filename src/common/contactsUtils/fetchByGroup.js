const Contact = require("../../../models").Contact;

const fetchByGroup = async (user_id, group) => {
  var contactsArray = [];
  const contacts = await Contact.findAll({
    where: { user_id: user_id },
  });
  contacts.forEach((contact) => {
    if (
      JSON.parse(contact.json).group &&
      JSON.parse(contact.json).group === group
    ) {
      contactsArray.push(contact.json);
    }
  });
  return contactsArray;
};

module.exports = { fetchByGroup };
