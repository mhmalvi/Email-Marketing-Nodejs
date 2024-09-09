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
      [
        Sequelize.fn("MAX", Sequelize.col("updatedAt", "batchID")),
        "updatedAt",
        "batchID",
      ],
    ],
    group: ["group"],
  });
};
module.exports.fetchGroupsByPagination = async (user_id, per_page, offset) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id) },
    limit: per_page,
    offset: offset,
    attributes: [
      "group",
      [
        Sequelize.fn("MAX", Sequelize.col("updatedAt", "batchID")),
        "updatedAt",
        "batchID",
      ],
    ],
    group: ["group"],
  });
};
