const {
  randomAlphaNumeric,
  fieldsValidation,
} = require("../../../config/utils");
const { Op } = require("sequelize");
const { findUser } = require("../../common/users/findUser");
const { saveToken } = require("../../common/utils");
const User = require("../../../models").User;
const Token = require("../../../models").Token;
const Subadmin = require("../../../models").Subadmin;

const fetchSubadminsByCompany = async (req, res) => {
  const { userID } = req.body;
  const requiredFields = {
    userID,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const subadmins = await fetchSubAdminByCompany(userID);
    // if(subadmins)
    if (subadmins) {
      res.status(404).json({
        message: "success",
        status: 200,
        subadmins: subadmins,
      });
    } else {
      res.status(404).json({
        message: "not found",
        status: 404,
      });
    }
  }
};

// ---------------------------- helper-----------------------------------

const fetchSubAdminByCompany = async (userID) => {
  console.log("userID", userID);
  const user_id = JSON.parse(userID);
  return await Subadmin.findAll({
    where: {
      userID: {
        [Op.like]: `%${user_id}%`,
      },
    },
    attributes: { exclude: ["userID"] },
  });
};

module.exports = { fetchSubadminsByCompany };
