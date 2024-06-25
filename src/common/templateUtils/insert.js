const Template = require("../../../models").Template;

const saveTemplate = (data) => {
  console.log(data);
  return Template.create({
    name: data.name,
    template: data.template,
    client_id: JSON.parse(data.userID),
  });
};

module.exports = { saveTemplate };
