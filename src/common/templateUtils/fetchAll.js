const Template = require("../../../models").Template;

module.exports.fetchAll = async (client_id) => {
  return await Template.findAll({
    where: { client_id: client_id },
  });
};
