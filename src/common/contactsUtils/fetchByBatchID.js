const Contact = require("../../../models").Contact;
module.exports.fetchByBatchID = async (user_id, batchID) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(user_id), batchID: JSON.parse(batchID) },
    order: [["id", "DESC"]],
  });
};

module.exports.fetchByBatchIDPagination = async (
  userID,
  offset,
  batchID,
  per_page
) => {
  return await Contact.findAll({
    where: { user_id: JSON.parse(userID), batchID: JSON.parse(batchID) },
    order: [["id", "DESC"]],
    limit: JSON.parse(per_page),
    offset: offset,
  });
};
