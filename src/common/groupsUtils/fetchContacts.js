const Contact = require("../../../models").Contact;

module.exports.fetchContacts = async (user_id) => {
  return await Contact.findAll({ where: { user_id: JSON.parse(user_id) } });
};

module.exports.fetchGroupsByID = async (user_id) => {
  return await Contact.findAll(
    { where: { user_id: JSON.parse(user_id) } },
    {
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("group")), "email"]],
    }
  );
};
module.exports.fetchGroupsPagination = async (user_id) => {
  return await Contact.findAll({ where: { user_id: JSON.parse(user_id) } });
};
