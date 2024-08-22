const User = require("../../../models").User;
const Subadmin = require("../../../models").Subadmin;
const bcrypt = require("bcrypt");
const resetPass = async (req, res) => {
    console.log(req.body);
    
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ where: { email: email } });
    const subadmin = await Subadmin.findOne({
      where: { email: email },
    });
    if (user.pass_reset_token) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds); /// generate salt
      if (salt) {
        const userPassword = await bcrypt.hash(password, salt); //// bcrypt password
        user.password = userPassword;
        user.pass_reset_token = null;
        await user.save();
        res.send("Password reset successful");
      }
    } else if (subadmin.pass_reset_token) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds); /// generate salt
      if (salt) {
        const userPassword = await bcrypt.hash(password, salt); //// bcrypt password
        subadmin.password = userPassword;
        subadmin.pass_reset_token = null;
        await subadmin.save();
        res.send("Password reset successful");
      }
    } else {
      res.send("Password reset successful");
    }
  }
};
module.exports = { resetPass };
