const Contact = require("../../../models").Contact;

const fetch = async (data) => {
  return await Contact.findAll({
    where: { user_id: data },
    include: [
      {
        order: [["id", "DESC"]],
      },
    ],
  });
};

module.exports = { fetch };
