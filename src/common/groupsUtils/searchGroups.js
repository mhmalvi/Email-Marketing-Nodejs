const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Contact = require("../../../models").Contact;

module.exports.searchGroups = async (data) => {
  return await Contact.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("group")), "group"]],
    where: {
      group: {
        [Op.like]: `%${data.keyword}%`,
      },
      user_id: JSON.parse(data.userID),
    },
  });
};

module.exports.searchGroupsPagination = async (
  userID,
  offset,
  per_page,
  keyword
) => {
  return await Contact.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("group")), "group"]],
    where: {
      group: {
        [Op.like]: `%${keyword}%`,
      },
      user_id: JSON.parse(userID),
    },
    limit: per_page,
    offset: offset,
  });
};
