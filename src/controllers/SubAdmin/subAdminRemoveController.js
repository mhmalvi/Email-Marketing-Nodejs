const { fieldsValidation } = require("../../../config/utils");
const Subadmin = require("../../../models").Subadmin;

const subAdminRemove = async (req, res) => {
  const { userID, subadminID } = req.body;
  const requiredFields = {
    userID,
    subadminID,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    console.log('userID',userID);
    console.log('subadminID',subadminID);
    const result = await removeSubadmin(userID, subadminID);
    res.status(201).json({
      message: "Deleted",
      status: 201,
    });
  }
};

// ---------------------------------helper-----------------------------------
const removeSubadmin = async (userID, subadminID) => {
  const subadmin = await Subadmin.findOne({ where: { id: subadminID } });
  if (subadmin) {
    const array = JSON.parse(subadmin.userID);
    const index = array.indexOf(userID);
    if (index > -1) {
      array.splice(index, 1);
      if (array.length == 0) {
        return await Subadmin.destroy({ where: { id: subadminID } });
      } else {
        return await Subadmin.update(
          { userID: JSON.stringify(array) },
          { where: { id: subadminID } }
        );
      }
    }
  }
};

module.exports = { subAdminRemove };
