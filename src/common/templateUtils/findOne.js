const Template = require("../../../models").Template;

module.exports.findOne = async (data) => {
  return await Template.findOne({
    where: { name: data.name, client_id: data.user_id },
  });
};
