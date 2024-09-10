const Contact = require("../../../models").Contact;

const fetchByGroup = async (user_id, group) => {
  return await Contact.findAll({
    where: { user_id: user_id, group: group },
    order: [["id", "DESC"]],
  });
};



module.exports = { fetchByGroup };
