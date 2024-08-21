const User = require("../../../models").User;
const { Op } = require("sequelize");
const Subadmin = require("../../../models").Subadmin;
const { fieldsValidation } = require("../../../config/utils");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const AppPassword = require("../../../models").AppPassword;
const {
  transporter,
} = require("../../common/transporterUtils/customTransporter");
const {
  createSubAdminUtils,
} = require("../../common/users/subadmin/createSubadmin");
const {
  findSubadminByEmailAndUserID,
} = require("../../common/users/subadmin/findSubadminByEmailAndUserID");
const { findUser } = require("../../common/users/findUser");
const { fetchOne } = require("../../common/appPassUtils/fetchOne");
const {
  findSubadminByEmail,
} = require("../../common/users/subadmin/findSubadminByEmail");
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
    const userExist = await findSubadminByEmailAndUserID(email, userID); ///check if subadmin already exists
    const userEmailExist = await findSubadminByEmail(email); ///check if subadmin already exists
    const sender = await AppPassword.findOne({ where: { user_id: userID } }); //// fetch sender
    const inviter = await findUser(userID); //// fetch inviter
    const inviter_email = await User.findOne({ where: { email: email } }); ///fetch user by email
    //////////////////////////////////////////////////////////////////////////////
    if (userExist) {
      res.status(422).json({
        message: "Sub admin already exists",
        status: 422,
      });
    } else if (inviter_email) {
      res.status(422).json({
        message: "You cannot use this email",
        status: 422,
      });
    } else if (userEmailExist) {
      var data = [];
      var data = JSON.parse(userEmailExist.userID);
      console.log(data);
      await data.push(userID);
      const result = await Subadmin.update(
        {
          userID: JSON.stringify(data),
        },
        { where: { id: userEmailExist.id } }
      );
      if (result) {
        res.status(201).json({
          message: "success",
          status: 201,
        });
      }
    } else {
      const password = await passGenerator(); //// generate random password
      const templatePath = path.join(
        __dirname,
        "../../views/hbs/invitation.hbs"
      );
      var user_id = [];

      var templateSource = fs.readFileSync(templatePath, "utf8");
      const finalTemplate = handlebars.compile(templateSource);
      const data = {
        userName: userName,
        userID: userID,
        email: email,
        password: password,
        admin_name: inviter.userName,
      };
      const htmlToSend = finalTemplate(data);
      if (sender) { ////////// if app password exists
        let transporterResponse = await transporter(sender); ////////// transport
        const mailOptions = {
          from: `${sender.email}`,
          to: email, // list of receivers
          subject: "Invitation", // Subject line
          html: htmlToSend,
        };

        try {
          await transporterResponse.sendMail(mailOptions);
          await createSubAdminUtils(data);
          res.status(201).json({
            message: "success",
            status: 201,
          });
        } catch (error) {
          res.status(535).json({
            message: "Sender email or app password wrong",
            status: 535,
            error: error,
          });
        } //// send mail
      } else {
        ////////// if app password not exists
        res.status(404).json({
          message: "App password not set",
          status: 404,
        });
      }
    }
  }
};

/////////////////////////// helper /////////////////////////

// const sendMail = async (email, sender, htmlToSend) => {

// };
const passGenerator = (length = 8) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};
module.exports = { createSubAdmin };
