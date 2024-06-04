const Contact = require("../../../models").Contact;

const ifContactExist = async (user_id) => {
  return await Contact.findAll({
    attributes: ["email"],
    where: { user_id: user_id },
  });
};

module.exports = { ifContactExist };
