const Contact = require("../../../models").Contact;

const fetchByGroupPagination = async (user_id, group, size, offset) => {
  //   console.log(size, offset);
  var contactsArray = [];
  return await Contact.findAll({
    where: { user_id: user_id, group: group },
    order: [["id", "DESC"]],
    limit: size,
    offset: offset,
  });
};

module.exports = { fetchByGroupPagination };
