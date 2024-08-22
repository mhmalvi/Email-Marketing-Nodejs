const Subadmin = require("../../../models").Subadmin;
const User = require("../../../models").User;
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { fieldsValidation } = require("../../../config/utils");

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const requiredFields = { email };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const user = await getUser(email); ////////////// get main user by email
    const subadmin = await getSubadmin(email); ////////////// get subadmin by email
    if (user && subadmin === null) {
      const token = await crypto.randomBytes(20).toString("hex");
      user.pass_reset_token = token;
      const result = await user.save();
      try {
        await mail(email, token);
      } catch (error) {
        res.status(535).json({
          message: "Incorrect sender mail or password",
          status: 535,
        });
      }

      if (result) {
        res.status(201).json({
          message:
            "Please go to your gmail account and click the link to reset your password",
          status: 201,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
        });
      }
    } else if (subadmin && user === null) {
      const token = await crypto.randomBytes(20).toString("hex");
      subadmin.pass_reset_token = token;
      const result = await subadmin.save();
      if (result) {
        res.status(201).json({
          message:
            "Please go to your gmail account and click the link to reset your password",
          status: 201,
        });
      } else {
        res.status(500).json({
          message: "Failed",
          status: 500,
        });
      }
    } else {
      res.status(422).json({
        message: "Email not found",
        status: 422,
      });
    }
  }
};

// ------------------------------- helper--------------------------------
const getUser = async (email) => {
  return await User.findOne({ where: { email: email } });
};

const getSubadmin = async (email) => {
  return await Subadmin.findOne({ where: { email: email } });
};

const mail = async (to, token) => {
    console.log("EMAIL", EMAIL);
    console.log("EMAIL_PASSWORD", EMAIL_PASSWORD);
  const transporter = await nodemailer.createTransport({
    service: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${process.env.BASE_URL}/reset-password/${token}`,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log(`Email sent: ${info.response}`);
      res
        .status(200)
        .send("Check your email for instructions on resetting your password");
    }
  });
};

module.exports = { forgetPassword };
