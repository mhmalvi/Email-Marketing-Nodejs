const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const Subscribe = require("../../../../models").Subscribe;
const stripe_key = Stripe(process.env.STRIPE_KEY);
const {
  transporter,
} = require("../../../common/transporterUtils/customTransporter");
const nodemailer = require("nodemailer");

const test = async () => {
  const customTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tanjib@quadque.tech",
      pass: "fgfghgfhfgh",
    },
  });
  const mailOptions = {
    from: `tanjib@quadque.tech`,
    to: "tanjib@quadque.tech", // list of receivers
    subject: "mail.subject", // Subject line
    html: "htmlToSend",
  };
  var errorCode = 0;
  await customTransporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.log(err.responseCode);
      // return "Error while sending email" + err;
      errorCode = err.responseCode;
    } else {
      console.log(info.accepted[0]);
      console.log("Email sent", info.accepted);
    }
  });
  if (errorCode) {
    resizeBy.json(errorCode);
  }
};

module.exports = { test };
