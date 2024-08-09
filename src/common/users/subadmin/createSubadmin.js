const User = require("../../../../models").User;
const createSubAdmin = async (data) => {
  const userExist = User.findOne({ where: { email: data.email } });
    if (userExist) {
      
  } else {
    return await User.create({
      userName: data.userName,
      email: data.email,
      pid: data.userID,
      status: 2,
      role: 4,
      first_user: 1,
    });
  }
};
module.exports = { createSubAdmin };
