const Contact = require("../../../models").Contact;

const updateOne = async (id) => {
  await Contact.update({ json: req.body.json });
};

module.exports = { updateOne };
