const Contact = require("../../../models").Contact;

const saveContact = async (data, userID) => {
  return await Contact.bulkCreate({
    json: data,
    email: data.email ? data.email : "",
    group: data.group ? data.group : "",
    user_id: userID,
  });
};

module.exports = { saveContact };
