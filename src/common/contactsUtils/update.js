const Contact = require("../../../models").Contact;

const updateOne = async (data) => {
  console.log(data);
  return await Contact.update(
    {
      json: data.json,
      name: data.json.name ? data.json.name : "",
      group: data.json.group ? data.json.group : "",
      company: data.company ? data.company : null,
    },
    { where: { id: JSON.parse(data.id), user_id: JSON.parse(data.user_id) } }
  );
};

module.exports = { updateOne };
