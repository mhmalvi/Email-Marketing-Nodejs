const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Contact = require("../../../models").Contact;

module.exports.searchGroups = async (data) => {
  return await Contact.findAll({
    attributes: [
      "group",
      [Sequelize.fn("MAX", Sequelize.col("updatedAt")), "updatedAt"],
      [Sequelize.fn("MAX", Sequelize.col("batchID")), "batchID"],
    ],
    where: {
      [Op.or]: [
        {
          batchID: {
            [Op.like]: `${data.keyword}%`,
          },
        },
        {
          group: {
            [Op.like]: `${data.keyword}%`,
          },
        },
      ],
      user_id: JSON.parse(data.userID),
    },
    group: ["group"],
  });
};

module.exports.searchGroupsPagination = async (
  userID,
  offset,
  per_page,
  keyword
) => {
  return await Contact.findAll({
    attributes: [
      "group",
      [Sequelize.fn("MAX", Sequelize.col("updatedAt")), "updatedAt"],
      [Sequelize.fn("MAX", Sequelize.col("batchID")), "batchID"],
    ],
    where: {
      group: {
        [Op.like]: `${keyword}%`,
      },
      user_id: JSON.parse(userID),
    },
    group: ["group"],
    limit: per_page,
    offset: offset,
  });
};
