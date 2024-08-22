const Subadmin = require("../../../models").Subadmin;
const User = require("../../../models").User;
const Token = require("../../../models").Token;
const bcrypt = require("bcrypt");
const { fieldsValidation } = require("../../../../config/utils");

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const requiredFields = { email };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const user = await getUser(email); ////////////// get main user by email
    const subadmin = await getSubadmin(email); ////////////// get subadmin by email
    console.log("user", user);
    console.log("subadmin", subadmin);
    if (user && !subadmin) {
    } else if (subadmin && !user) {
    } else {
      res.status(422).json({
        message: "Email not found",
        status: 422,
      });
    }
  }
};

// ------------------------------- helper--------------------------------
const getUser = async (email) => {
  return await User.findOne({ where: { email: email } });
};

const getSubadmin = async (email) => {
  return await User.findOne({ where: { email: email } });
};

module.exports = { forgetPassword };
