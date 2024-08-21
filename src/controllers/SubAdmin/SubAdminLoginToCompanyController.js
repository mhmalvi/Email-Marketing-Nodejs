const {
  randomAlphaNumeric,
  fieldsValidation,
} = require("../../../config/utils");
const {
  retrieveSubscriptionFromDB,
} = require("../../common/subscription/retrieveSubscriptionDB");
const { findUser } = require("../../common/users/findUser");
const { saveToken } = require("../../common/utils");
const User = require("../../../models").User;
const Token = require("../../../models").Token;
const subAdminLoginToCompany = async (req, res) => {
  const { userID, said } = req.body;
  const requiredFields = {
    userID,
    said,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const user = await findUser(userID); ////////// get user details
    const bearerHeader = req.headers["authorization"];
    const tokenDetails = await Token.findOne({
      where: { said: said, satok: bearerHeader },
    }); ///////////////// get subadmin token details
    const userToken = "Bearer " + randomAlphaNumeric(60);
    const data = {
      email: user.email,
      token: userToken,
      userName: user.userName,
      photo: user.image,
      userID: user.id,
      first_user: user.first_user,
      satok: bearerHeader,
      said: said,
    };
    const tokenSetResponse = await setUserToken(
      user.email,
      userID,
      tokenDetails.id,
      userToken
    );
    // res.json(tokenSetResponse)
    if (tokenSetResponse[0] == 1) {
      res.status(200).json({
        message: "success",
        status: 200,
        data: data,
      });
    } else {
      res.status(200).json({
        message: failed,
        status: 500,
      });
    }
  }
};

////////////////////////// helper method //////////////////////////
const setUserToken = async (email, userID, token_id, token) => {
  console.log("userID", userID);
  return await Token.update(
    { email: email, token: token, userId: userID },
    { where: { id: token_id } }
  );
};
module.exports = { subAdminLoginToCompany };
