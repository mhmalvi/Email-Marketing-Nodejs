const Contact = require("../../../models").Contact;

const fetchByGroup = async (user_id, group) => {
  //   console.log(size, offset);
  var contactsArray = [];
  const contacts = await Contact.findAll({
    where: { user_id: user_id },
    order: [["id", "DESC"]],
  });
  let count = 0;
  contacts.forEach((contact) => {
    console.log(contact);
    if (contact.json.group && contact.json.group === group) {
      contactsArray.push(contact);
      count = contactsArray.length;
    }
  });
  //   console.log(contactsArray);
  contactsArray.push(count);
  return contactsArray;
};

module.exports = { fetchByGroup };
