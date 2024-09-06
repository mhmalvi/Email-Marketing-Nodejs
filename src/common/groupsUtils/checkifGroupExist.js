const Contact = require("../../../models").Contact;

const ifGroupExist = async (user_id, element) => {
  return await Contact.findOne({
    where: { user_id: user_id, group: element.group },
  });
};

module.exports = { ifGroupExist };
