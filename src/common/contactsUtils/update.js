const Contact = require("../../../models").Contact;

const updateOne = async (data) => {
  console.log(data);
  return await Contact.update(
    { json: data.json, group: data.json.group ? data.json.group : "" },
    { where: { id: data.id, user_id: data.userID } }
  );
};

module.exports = { updateOne };
