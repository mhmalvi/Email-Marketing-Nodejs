const Contact = require("../../../models").Contact;

const saveContact = async (data, userID, batchID) => {
  return await Contact.create({
    json: data,
    name: data.name ? data.name : "",
    email: data.email ? data.email : "",
    group: data.group ? data.group : "",
    company: data.company ? data.company : null,
    user_id: userID,
    batchID: batchID,
  });
};

module.exports = { saveContact };
