const { fetchContacts } = require("../../common/groupsUtils/fetchContacts");

const groupDestroy = async (req, res) => {
  const { userID, page, per_page } = req.body;
  const requiredFields = { userID, page, per_page };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const contacts = await fetchContacts(userID);
    res.json(contacts);
  }
};

module.exports = { groupDestroy };
