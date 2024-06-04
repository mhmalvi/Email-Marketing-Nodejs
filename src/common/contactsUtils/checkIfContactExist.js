const Contact = require("../../../models").Contact;

const ifContactExist = async (user_id, email) => {
  return await Contact.findOne({
    where: { user_id: data, email: email },
  });
};

module.exports = { ifContactExist };
