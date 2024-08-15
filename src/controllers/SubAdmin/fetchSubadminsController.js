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
    res.json(subadmins);
  }
};

// ---------------------------- helper-----------------------------------

const fetchSubAdminByCompany = async (userID) => {
  console.log("userID", userID);
  const userID = JSON.parse(userID)
  return await Subadmin.findAll({
    where: {
      userID: {
        [Op.like]: `%${userID}%`,
      },
    },
  });
};

module.exports = { fetchSubadminsByCompany };
