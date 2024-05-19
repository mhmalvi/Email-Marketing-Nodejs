const Contact = require("../../../models").Contact;

const destroy = async (data) => {
  return await Contact.destroy({
    where: { id: data.id, user_id: data.user_id },
  });
};

module.exports = { destroy };
