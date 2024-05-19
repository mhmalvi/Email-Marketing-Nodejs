const Template = require("../../../models").Template;

const destroy = async (data) => {
  return await Template.destroy({
    where: { id: data.id, user_id: data.user_id },
  });
};

module.exports = { destroy };
