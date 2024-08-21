const Subadmin = require("../../../models").Subadmin;
const User = require("../../../models").User;
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const saltRounds = 10;
  var result = "";
  const { userPassword } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds); /// generate salt
    if (salt) {
      const password = await bcrypt.hash(userPassword, salt); //// bcrypt password
      if (req.body.userID) {
        //////// check if it is main user's id
        const { userID } = req.body;
        result = await User.update(
          { password: password },
          { where: { id: userID } }
        );
      } else if (req.body.said) {
        //////// check if it is subadmin's id
        const { said } = req.body;
        result = await Subadmin.update(
          { password: password },
          { where: { id: said } }
        );
      }
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
};
module.exports = { changePassword };
