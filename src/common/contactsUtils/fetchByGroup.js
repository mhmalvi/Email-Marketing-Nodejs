const Contact = require("../../../models").Contact;

const fetchByGroup = async (user_id, group) => {
  //   console.log(size, offset);
  var contactsArray = [];
  // var includes = [{ model: Contact, as: "Contact.json" }];
  var filter = { "Contact.json.group": group, "Contact.user_id": user_id };
  const contacts = await Contact.findAll({
    // include: includes,
    where: { ["$contact.json.group$"]: group, "contact.user_id": user_id },
    include: [{ model: Contact, as: "contact" }],
    order: [["id", "DESC"]],
  });
  console.log(contacts);
  // contacts.forEach((contact) => {
  //   console.log(contact);
  //   if (contact.json.group && contact.json.group === group) {
  //     contactsArray.push(contact);
  //   }
  // });
  //   console.log(contactsArray);
  // contactsArray.push({ total: count });
  return contactsArray;
};

module.exports = { fetchByGroup };
