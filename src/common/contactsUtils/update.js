const Contact = require("../../../models").Contact;

const updateOne = async (data) => {
  console.log(data);
  await Contact.update({ json: data.json }, { where: { id: data.id } });
};

module.exports = { updateOne };
