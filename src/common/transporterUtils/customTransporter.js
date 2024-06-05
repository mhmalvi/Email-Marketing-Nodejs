const nodemailer = require("nodemailer");

const transporter = async (data) => {
  const customTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: data.email,
      pass: data.app_password,
    },
  });
  return customTransporter;
};

module.exports = { transporter };
