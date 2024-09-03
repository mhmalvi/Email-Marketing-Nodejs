const { fieldsValidation } = require("../../../config/utils");
const { groupDestroyer } = require("../../common/groupsUtils/groupDestroyer");

const groupDestroy = async (req, res) => {
  const { userID, groups } = req.body;
  const requiredFields = { userID, groups };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    if (groups.length > 0) {
      try {
        groups.map(async (group) => {
          await groupDestroyer(userID, group);
        });
        res.status(201).json({
          message: "Deleted",
          status: 201,
        });
      } catch (error) {
        res.json(error);
      }
    } else {
      res.status(404).json({
        message: "No data found",
        status: 404,
      });
    }
  }
};

module.exports = { groupDestroy };
