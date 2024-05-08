const Contact = require("../../../models").Contact;

const saveContact = async (data) => {
  return await Contact.create({
    json: data,
  });
};

module.exports = { saveContact };
