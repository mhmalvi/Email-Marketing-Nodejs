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

const contactCounts = async (userID) => {
  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();
  return await Contact.count({
    where: {
      userID: userID,
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });
};

module.exports = { fetch,contactCounts };
