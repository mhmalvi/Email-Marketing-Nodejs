const Sequelize = require("sequelize");
const Contact = require("../../../models").Contact;

module.exports.fetchContacts = async (user_id) => {
  return await Contact.findAll({ where: { user_id: JSON.parse(user_id) } });
};

module.exports.fetchGroupsByID = async (user_id) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    order: [["id", "DESC"]],
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("group")), "group"]],
  });
};
module.exports.fetchGroupsByPagination = async (user_id, size, offset) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    limit: size,
    offset: offset,
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("group")), "group"]],
  });
};
