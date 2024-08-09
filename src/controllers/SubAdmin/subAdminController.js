const User = require("../../../models").User;
const { fieldsValidation } = require("../../../config/utils");
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");
const {
  createSubAdminUtils,
} = require("../../common/users/subadmin/createSubadmin");
const createSubAdmin = async (req, res) => {
  const { userID, email, userName } = req.body;
  const requiredFields = {
    userID,
    email,
    userName,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    try {
      // const userExist = User.findOne({ where: { email: email } });
      // const sender = await AppPassword.findOne({
      //   where: { user_id: userID },
      // }); ////////// get app password
      // if (userExist) {

      //   let transporterResponse = await transporter(sender); ////////// transport
      //   const mailOptions = {
      //     from: `${sender.email}`,
      //     to: email, // list of receivers
      //     subject: "Invitation", // Subject line
      //     html: `<p>Hello ${userName}</p><br><p></p>`,
      //   };
      // }
      const result = await createSubAdminUtils(req.body); //////////////// create subadmin
      if (result) {
        res.status(201).json({
          message: "created",
          status: 201,
          subadmin: result,
        });
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
