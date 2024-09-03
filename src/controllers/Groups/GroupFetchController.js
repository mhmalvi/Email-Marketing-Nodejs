const { fieldsValidation } = require("../../../config/utils");
const {
  fetchContacts,
  fetchGroupsByID,
  fetchGroupsByPagination,
} = require("../../common/groupsUtils/fetchContacts");

const fetchGroups = async (req, res) => {
  if (req.body.userID) {
    var contactArray = [];
    const { userID } = req.body;
    const contacts = await fetchContacts(userID);
    //   console.log(contacts);
    await contacts.forEach((contact) => {
      const group = contact.json.group;
      if (group) {
        //   console.log(contact.json.group);
        if (!contactArray.includes(group)) {
          contactArray.push(group);
        }
      }
    });
    if (contactArray.length > 0) {
      res.status(200).json({
        message: "success",
        status: 200,
        groups: contactArray,
      });
    } else {
      res.status(404).json({
        message: "No groups found",
        status: 404,
      });
    }
  } else {
    res.status(422).json({
      message: "Invalid User",
      status: 422,
    });
  }
};

const fetchGroupsPagination = async (req, res) => {
  const { userID, page, per_page } = req.body;
  const requiredFields = { userID, page, per_page };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    offset = (page - 1) * per_page;
    const total = await fetchGroupsByID(userID);
    const totalPages = total.length > 0 ? total.length / per_page : "";
    const result = await fetchGroupsByPagination(userID, per_page, offset);
    if (result.length > 0) {
      res.status(200).json({
        message: "success",
        status: 200,
        groups: result,
        total: total.length,
        totalPages: Math.ceil(totalPages),
        current_page: page,
      });
    } else {
      res.status(404).json({
        message: "No groups found",
        status: 404,
      });
    }
  }
};

module.exports = { fetchGroups, fetchGroupsPagination };
