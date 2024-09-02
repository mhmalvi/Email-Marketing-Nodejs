const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Contact = require("../../../models").Contact;

const fetch = async (data, size, offset) => {
  return await Contact.findAll({
    where: { user_id: data },
    order: [["id", "DESC"]],
    limit: size,
    offset: offset,
  });
};

const searchContacts = async (data) => {
  return await Contact.findAll({
    where: {
      [Op.or]: [
        {
          email: {
            [Op.like]: `%${data.keyword}%`,
          },
        },
        {
          group: {
            [Op.like]: `%${data.keyword}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${data.keyword}%`,
          },
        },
      ],
      user_id: JSON.parse(data.userID),
    },
  });
};
const searchContactsPagination = async (userID, offset, per_page, keyword) => {
  return await Contact.findAll({
    where: {
      [Op.or]: [
        {
          email: {
            [Op.like]: `${keyword}%`,
          },
        },
        {
          group: {
            [Op.like]: `${keyword}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
      user_id: JSON.parse(userID),
    },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};

const contactCounts = async (userID) => {
  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();
  return await Contact.count({
    where: {
      user_id: userID,
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });
};

module.exports = {
  fetch,
  contactCounts,
  searchContacts,
  searchContactsPagination,
};
