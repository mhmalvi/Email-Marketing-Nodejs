const Contact = require("../../../models").Contact;

const destroy = async (data) => {
  return await Contact.destroy({
    where: { id: id },
  });
};

module.exports = { destroy };
