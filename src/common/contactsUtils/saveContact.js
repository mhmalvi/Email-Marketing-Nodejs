const Contact = require("../../../models").Contact;

const saveContact = (data, userID) => {
  return Contact.create({
    json: data,
    email: data.email ? data.email : "",
    group: data.group ? data.group : "",
    user_id: userID,
  });
};

module.exports = { saveContact };
