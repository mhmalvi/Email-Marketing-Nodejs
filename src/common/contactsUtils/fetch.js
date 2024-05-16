const Contact = require("../../../models").Contact;

const fetch = async (data, size, offset) => {
  return await Contact.findAll({
    where: { user_id: data },
    order: [["id", "DESC"]],
    limit: size,
    offset: offset,
  });
};

module.exports = { fetch };
