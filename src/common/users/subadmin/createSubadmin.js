const User = require("../../../../models").User;
const createSubAdminUtils = async (data) => {
  const userExist = await User.findOne({ where: { email: data.email } }); //get User
  console.log("userExist", userExist);

  if (userExist) {
    const subUser = userExist.pid ? JSON.parse(userExist.pid) : []; //array
    subUser.push(data.userID); // push in array
    userExist.pid = JSON.stringify(subUser);
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
