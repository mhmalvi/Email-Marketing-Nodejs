const Sequelize = require("sequelize");
const Contact = require("../../../models").Contact;

module.exports.fetchContacts = async (user_id) => {
  return await Contact.findAll({ where: { user_id: JSON.parse(user_id) } });
};

module.exports.fetchGroupsByID = async (user_id) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("group")), "group", "updatedAt"],
    ],
  });
};
module.exports.fetchGroupsByPagination = async (user_id, per_page, offset) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    limit: per_page,
    offset: offset,
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("group")), "group", "updatedAt"],
    ],
  });
};
