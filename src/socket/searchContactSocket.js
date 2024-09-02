const {
  searchContactsPagination,
  searchContacts,
} = require("../common/contactsUtils/fetch");

const searchContactSocket = async (data) => {
  const { userID, page, per_page, keyword } = data;
  const offset = (page - 1) * per_page;
  const contacts = await searchContacts(data);
  const paginated = await searchContactsPagination(
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

module.exports = { searchContactSocket };
