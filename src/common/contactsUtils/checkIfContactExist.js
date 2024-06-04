const Contact = require("../../../models").Contact;

const ifContactExist = async (user_id, email) => {
  return await Contact.findAll({
    where: { user_id: user_id },
    attributes: ["email"],
  });
};

module.exports = { ifContactExist };
