const Sequelize = require("sequelize");
const Contact = require("../../../models").Contact;

module.exports.fetchContacts = async (user_id) => {
  return await Contact.findAll({ where: { user_id: JSON.parse(user_id) } });
};

module.exports.fetchGroupsByID = async (user_id) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    attributes: [
      "group",
      "batchID",
      [(Sequelize.fn("MAX", Sequelize.col("updatedAt")), "updatedAt")],
    ],
    group: ["group", "batchID"],
  });
};
module.exports.fetchGroupsByPagination = async (user_id, per_page, offset) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    limit: per_page,
    offset: offset,
    attributes: [
      "group",
      "batchID",
      [(Sequelize.fn("MAX", Sequelize.col("updatedAt")), "updatedAt")],
    ],
    group: ["group", "batchID"],
  });
};
