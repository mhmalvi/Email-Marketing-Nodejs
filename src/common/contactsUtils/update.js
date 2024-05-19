const Contact = require("../../../models").Contact;

const updateOne = async (data) => {
  console.log(data);
  return await Contact.update(
    { json: data.json },
    { where: { id: data.id, user_id: data.user_id } }
  );
};

module.exports = { updateOne };
