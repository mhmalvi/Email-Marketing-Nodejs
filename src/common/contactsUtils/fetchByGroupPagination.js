const Contact = require("../../../models").Contact;

const fetchByGroupPagination = async (group, user_id, per_page, offset) => {
  //   console.log(size, offset);
  var contactsArray = [];
  return await Contact.findAll({
    where: { user_id: user_id, group: group },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};

module.exports = { fetchByGroupPagination };
