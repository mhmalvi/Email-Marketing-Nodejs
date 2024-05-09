const Contact = require("../../../models").Contact;

const saveContact = (data, userID) => {
  return Contact.create({
    json: data,
    user_id: userID,
  });
};

module.exports = { saveContact };
