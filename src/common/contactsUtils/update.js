const Contact = require("../../../models").Contact;

const updateOne = async (data) => {
  await Contact.update({ json: data.json });
};

module.exports = { updateOne };
