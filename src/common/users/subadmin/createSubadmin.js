const User = require("../../../../models").User;
const createSubAdminUtils = async (data) => {
  const userExist = User.findOne({ where: { email: data.email } }); //get User
  if (userExist) {
    const subUser = userExist.pid ? JSON.parse(userExist.pid) : []; //array
    subUser.push(data.userID); // push in array
    userExist.pid = subUser;
    userExist.save();
  } else {
    const subUser = userExist.pid ? JSON.parse(userExist.pid) : []; //array
    subUser.push(data.userID); // push in array
    return await User.create({
      userName: data.userName,
      email: data.email,
      status: 2,
      role: 4,
      first_user: 1,
      pid: JSON.stringify(subUser),
    });
  }
};
module.exports = { createSubAdminUtils };
