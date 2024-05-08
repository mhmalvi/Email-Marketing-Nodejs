const Contact = require("../../../models").Contact;

const saveContact = async (data, userID) => {
  return await Contact.create({
    json: data,
    user_id: userID,
  });
};

module.exports = { saveContact };
