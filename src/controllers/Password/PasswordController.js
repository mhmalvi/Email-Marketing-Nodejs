const Subadmin = require("../../../models").Subadmin;
const User = require("../../../models").User;
const Token = require("../../../models").Token;
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const saltRounds = 10;
  var result = "";
  const { userPassword } = req.body;
  const bearerHeader = req.headers["authorization"];
  try {
    const salt = await bcrypt.genSalt(saltRounds); /// generate salt
    if (salt) {
      const password = await bcrypt.hash(userPassword, salt); //// bcrypt password
      // if (req.body.userID) {
      //////// check if it is main user's id
      const { userID } = req.body;
      const user = await Token.findOne({
        where: { userId: userID, token: bearerHeader },
      }); //// find users in token table
      console.log("user.said", user.said);
      
      if (user.said === null) {
        ////////// if subadmin id is null
        result = await User.update(
          { password: password },
          { where: { id: userID } }
        );
      } else if (user.said !== null) {
        ////////// if admin id is null
        result = await Subadmin.update(
          { password: password },
          { where: { id: user.said } }
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
