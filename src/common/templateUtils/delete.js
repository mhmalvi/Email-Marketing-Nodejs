const Template = require("../../../models").Template;

const destroy = async (data) => {
  return await Template.destroy({
    where: { id: data.id, client_id: JSON.parse(data.userID) },
  });
};

module.exports = { destroy };
