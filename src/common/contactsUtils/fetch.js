const Contact = require("../../../models").Contact;

const fetch =  (data) => {
  return Contact.findAll({
    where: { user_id: data },
    order: [["id", "DESC"]],
  });
};

module.exports = { fetch };
