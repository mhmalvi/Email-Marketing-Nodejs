const Contact = require("../../../models").Contact;
module.exports.fetchByBatchID = async (user_id, batchID) => {
  return await Contact.findAll({
    where: { user_id: user_id, batchID: batchID },
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
    where: { user_id: userID, batchID: batchID },
    order: [["id", "DESC"]],
    limit: per_page,
    offset: offset,
  });
};
