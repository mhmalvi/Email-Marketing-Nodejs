const Contact = require("../../../models").Contact;

const ifContactExist = async (user_id) => {
  return await Contact.findOne({
    where: { user_id: user_id, json: element },
  });
};

module.exports = { ifContactExist };
