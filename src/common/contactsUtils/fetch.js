const Contact = require("../../../models").Contact;

const fetch = async (data, size) => {
  return await Contact.findAll({
    where: { user_id: data },
    order: [["id", "DESC"]],
    limit: size,
  });
};

module.exports = { fetch };
