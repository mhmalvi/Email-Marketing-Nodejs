const Template = require("../../../models").Template;

module.exports.fetchAll = async (data) => {
  return await Template.findOne({
    where: { name: data.name, client_id: data.user_id },
  });
};
