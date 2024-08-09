const User = require("../../../models").User;
const { fieldsValidation } = require("../../../config/utils");

const createSubAdmin = async (req, res) => {
  const { userID, email, userName } = req.body;
  const requiredFields = {
    userID,
    email,
    userName,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    try {
      const result = await User.create({
        userName: userName,
        email: email,
        pid: userID,
        status: 2,
        role: 4,
        first_user: 1,
      }); //////////////// create subadmin

      if (result) {
        res.status(201).json({
          message: "created",
          status: 201,
          subadmin: result,
        });
      } else {
      }
    } catch (error) {
      res.json({
        message: "failed",
        error: error,
      });
    }
  }
};
module.exports = { createSubAdmin };
