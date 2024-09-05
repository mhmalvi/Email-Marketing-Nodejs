const {
  searchGroups,
  searchGroupsPagination,
} = require("../common/groupsUtils/searchGroups");

const searchGroupSocket = async (data) => {
  const { userID, page, per_page, keyword } = data;
  const offset = (page - 1) * per_page;
  const contacts = await searchGroups(data);
  const paginated = await searchGroupsPagination(
    userID,
    offset,
    per_page,
    keyword
  );

  const totalPages = contacts.length / per_page;
  const count = contacts.length;
  const paginate = {
    paginatedData: paginated,
    current_page: page,
    count: count,
    totalPages: Math.ceil(totalPages),
  };
  return paginate;
};

module.exports = { searchGroupSocket };
