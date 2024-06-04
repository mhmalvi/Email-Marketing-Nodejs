const Contact = require("../../../models").Contact;

const ifContactExist = async (user_id) => {
    console.log(user_id);
  return await Contact.findAll({
    where: { user_id: user_id },
  });
};

module.exports = { ifContactExist };
