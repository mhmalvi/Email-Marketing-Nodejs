const Subadmin = require("../../../models").Subadmin;
const { fieldsValidation } = require("../../../config/utils");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { said, userPassword } = req.body;
  const requiredFields = {
    said,
    userPassword,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      if (salt) {
        const password = await bcrypt.hash(userPassword, salt);
        const result = await Subadmin.update(
          { password: password },
          { where: { id: said } }
        );
        if (result) {
          res.status(201).json({
            message: "success",
            status: 201,
          });
        } else {
          res.status(500).json({
            message: "failed",
            status: 500,
          });
        }
      }
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }
};
module.exports = { changePassword };
