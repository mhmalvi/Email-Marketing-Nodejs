const Contact = require("../../../models").Contact;

module.exports.fetchContactsByPagination = async (user_id, size, offset) => {
  return await Contact.findAll({
    where: { user_id: user_id },
    limit: size,
    offset: offset,
  });
};
