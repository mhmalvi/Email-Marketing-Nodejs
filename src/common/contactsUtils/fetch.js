const Contact = require("../../../models").Contact;

const fetch =  async (data) => {
  return await Contact.findAll({
    where: { user_id: data },
    order: [["id", "DESC"]],limit:10
  });
};

module.exports = { fetch };
