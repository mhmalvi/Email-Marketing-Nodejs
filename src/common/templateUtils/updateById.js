const Template = require("../../../models").Template;

const updateById = async (data) => {
  return await Template.update(
    { name: data.name, template: data.template },
    {
      where: { id: data.id, client_id: data.userID },
    }
  );
};
module.exports = { updateById };
